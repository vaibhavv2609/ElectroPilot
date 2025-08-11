import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Loader2, Brain, Mic, Sparkles, Clock, CheckCircle } from "lucide-react";

export default function Waiting() {
  const { userId } = useParams<{ userId: string }>();
  const [, navigate] = useLocation();
  const [callStatus, setCallStatus] = useState("Initiating AI call...");
  const [currentStep, setCurrentStep] = useState(0);

  const statuses = [
    "Initiating AI call...",
    "Connecting to your number...",
    "AI conversation in progress...",
    "Analyzing your responses...",
    "Generating personalized recommendations..."
  ];

  const steps = [
    { icon: Phone, label: "Calling", description: "Initiating secure connection" },
    { icon: Mic, label: "Listening", description: "AI understanding your needs" },
    { icon: Brain, label: "Analyzing", description: "Processing your preferences" },
    { icon: Sparkles, label: "Creating", description: "Generating recommendations" }
  ];

  useEffect(() => {
    let statusIndex = 0;
    const statusInterval = setInterval(() => {
      statusIndex = (statusIndex + 1) % statuses.length;
      setCallStatus(statuses[statusIndex]);
      setCurrentStep(Math.min(statusIndex, steps.length - 1));
    }, 2000);

    return () => clearInterval(statusInterval);
  }, []);

  const { data: callStatusData } = useQuery({
    queryKey: ['/api/call-status', userId],
    refetchInterval: 2000,
    enabled: !!userId,
  });

  useEffect(() => {
    if (callStatusData?.status === 'completed' && callStatusData?.hasRecommendations) {
      navigate(`/results/${userId}`);
    }
  }, [callStatusData, userId, navigate]);

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
        <div className="cyber-card p-12 lg:p-16">
          {/* Main Status */}
          <div className="mb-12">
            <div className="relative mb-8">
              <div className="floating-animation">
                <Phone className="text-primary text-8xl mx-auto glow-text animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="w-6 h-6 bg-accent rounded-full animate-ping"></div>
                <div className="absolute top-0 w-6 h-6 bg-accent rounded-full"></div>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 glow-text">
              AI Call in Progress
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Our advanced AI is calling you now. Please answer your phone for a personalized electronics consultation experience.
            </p>
          </div>

          {/* Current Status */}
          <div className="cyber-card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 p-6 mb-12">
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin h-8 w-8 text-primary mr-4" />
              <span className="text-white font-bold text-xl">{callStatus}</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {steps.map(({ icon: Icon, label, description }, index) => (
              <div key={index} className="text-center">
                <div className={`relative mb-4 ${
                  index <= currentStep ? 'text-primary' : 'text-white/30'
                } transition-all duration-500`}>
                  <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center transition-all duration-500 ${
                    index <= currentStep 
                      ? 'bg-primary/20 border-2 border-primary glow-purple' 
                      : 'bg-white/5 border border-white/20'
                  }`}>
                    <Icon className="text-2xl" />
                  </div>
                  {index <= currentStep && (
                    <CheckCircle className="absolute -top-2 -right-2 text-accent text-lg animate-pulse" />
                  )}
                </div>
                <h3 className={`font-bold mb-2 transition-colors duration-500 ${
                  index <= currentStep ? 'text-white' : 'text-white/50'
                }`}>
                  {label}
                </h3>
                <p className={`text-sm transition-colors duration-500 ${
                  index <= currentStep ? 'text-white/70' : 'text-white/30'
                }`}>
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-6 text-white/60">
            <div className="flex items-center justify-center">
              <Clock className="mr-3 h-5 w-5 text-accent" />
              <span>Expected duration: 2-3 minutes</span>
            </div>
            <div className="flex items-center justify-center">
              <Brain className="mr-3 h-5 w-5 text-primary" />
              <span>AI-powered conversation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
