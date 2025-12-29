import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, Sparkles, TrendingUp, Users } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobslice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) {
      toast.error("Please enter something to search!");
      return;
    }
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="relative text-center pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            No.1 Job Hunt Website
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Search, Apply & <br />
          Get Your{" "}
          <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
            Dream Jobs
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Discover thousands of opportunities tailored for you. Apply easily and
          start your career journey today!
        </motion.p>

        {/* Search bar */}
        <motion.div
          className="w-full max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex w-full shadow-elegant border border-border/50 pl-5 pr-2 py-2 rounded-2xl items-center gap-3 bg-card/80 backdrop-blur-sm hover:shadow-glow transition-shadow duration-300">
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find your dream jobs..."
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              onKeyDown={(e) => {
                if (e.key === "Enter") searchJobHandler();
              }}
            />
            <Button
              onClick={searchJobHandler}
              className="rounded-xl px-6"
            >
              Search
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[
            { icon: TrendingUp, label: "Jobs Posted", value: "10K+" },
            { icon: Users, label: "Active Users", value: "50K+" },
            { icon: Sparkles, label: "Companies", value: "2K+" },
          ].map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
