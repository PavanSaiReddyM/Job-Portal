import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  DollarSign,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/jobs/description/${job._id}`)}
      className="group relative p-6 rounded-2xl bg-card border border-border/50 
                 hover:border-primary/30 hover:shadow-elegant 
                 transition-all duration-300 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 
                          flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {job?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {job?.company?.name}
            </p>
          </div>
        </div>

        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary border-0 text-xs"
        >
          {job?.jobType || job?.type}
        </Badge>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{job?.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <DollarSign className="w-4 h-4" />
          <span>{job?.salary} LPA</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Recently posted</span>
        </div>
      </div>

      {/* Action */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          onClick={(e) => e.stopPropagation()}
        >
          Save for later
        </Button>

        <Button
          size="sm"
          className="rounded-xl group-hover:shadow-elegant"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/jobs/description/${job._id}`);
          }}
        >
          Apply Now
          <ArrowUpRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 
                      opacity-0 group-hover:opacity-100 transition-opacity 
                      duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default LatestJobCards;
