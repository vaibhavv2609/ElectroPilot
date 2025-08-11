import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { appendUserData } from "./services/googleSheets";
import { initiateCall, generateTwiML } from "./services/twilio";
import { transcribeAudio, generateRecommendations } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit user form and initiate call
  app.post("/api/submit", async (req, res) => {
    try {
      const validation = insertUserSchema.extend({
        phone: z.string().regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, "Invalid phone format")
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: validation.error.errors 
        });
      }

      const { name, phone } = validation.data;

      // Create user
      const user = await storage.createUser({ name, phone });

      // Append to Google Sheets (non-blocking)
      appendUserData(name, phone, new Date()).catch(console.error);

      // Initiate Twilio call
      const { callId } = await initiateCall(phone, user.id);

      // Create recommendation record
      await storage.createRecommendation({
        userId: user.id,
        callId,
        transcript: null,
        products: []
      });

      res.json({ 
        success: true, 
        userId: user.id,
        message: "Call initiated successfully"
      });
    } catch (error) {
      console.error("Submit error:", error);
      res.status(500).json({ 
        message: "Failed to process submission",
        error: error.message 
      });
    }
  });

  // Get recommendations for user
  app.get("/api/recs/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const recommendation = await storage.getRecommendation(userId);
      if (!recommendation) {
        return res.status(404).json({ message: "No recommendations found" });
      }

      res.json({
        user: { name: user.name },
        products: recommendation.products
      });
    } catch (error) {
      console.error("Recommendations error:", error);
      res.status(500).json({ 
        message: "Failed to get recommendations",
        error: error.message 
      });
    }
  });

  // Twilio TwiML endpoint
  app.get("/api/twiml/:userId", async (req, res) => {
    try {
      const twiml = generateTwiML(0);
      res.type('text/xml').send(twiml);
    } catch (error) {
      console.error("TwiML error:", error);
      res.status(500).send("Error generating TwiML");
    }
  });

  // Handle TwiML responses
  app.post("/api/twiml-response", async (req, res) => {
    try {
      const questionIndex = parseInt(req.body.questionIndex || "0") + 1;
      const twiml = generateTwiML(questionIndex);
      res.type('text/xml').send(twiml);
    } catch (error) {
      console.error("TwiML response error:", error);
      res.status(500).send("Error generating TwiML response");
    }
  });

  // Recording callback webhook
  app.post("/api/recording-callback", async (req, res) => {
    try {
      const { CallSid, RecordingUrl, RecordingStatus } = req.body;
      
      if (RecordingStatus === 'completed' && RecordingUrl) {
        // Find recommendation by call ID
        const allRecs = Array.from((storage as any).recommendations.values());
        const recommendation = allRecs.find((rec: any) => rec.callId === CallSid);
        
        if (recommendation) {
          try {
            // Download and transcribe recording (simplified for demo)
            const transcript = "Based on the call, the user is looking for a smartphone with good camera quality, budget around $800-1200, for photography and social media use.";
            
            // Generate AI recommendations
            const products = await generateRecommendations(transcript);
            
            // Update recommendation
            await storage.updateRecommendation(recommendation.id, {
              transcript,
              products
            });
          } catch (aiError) {
            console.error("AI processing error:", aiError);
          }
        }
      }
      
      res.status(200).send('OK');
    } catch (error) {
      console.error("Recording callback error:", error);
      res.status(500).send('Error processing recording');
    }
  });

  // Check call status
  app.get("/api/call-status/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const recommendation = await storage.getRecommendation(userId);
      
      if (!recommendation) {
        return res.status(404).json({ message: "Recommendation not found" });
      }

      const hasProducts = Array.isArray(recommendation.products) && recommendation.products.length > 0;
      
      res.json({
        status: hasProducts ? 'completed' : 'in_progress',
        hasRecommendations: hasProducts
      });
    } catch (error) {
      console.error("Call status error:", error);
      res.status(500).json({ 
        message: "Failed to check call status",
        error: error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
