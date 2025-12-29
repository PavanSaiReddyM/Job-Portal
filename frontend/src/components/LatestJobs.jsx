import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const LatestJobs = () => {
  const { alljobs } = useSelector((store) => store.job);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <motion.section
      className="py-20 px-4 sm:px-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Latest & Top
              </span>{" "}
              Job Openings
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
              Fresh opportunities waiting for you
            </p>
          </div>

          <Link
            to="/jobs"
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-2 transition-colors"
          >
            View all jobs <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Jobs Grid */}
        {alljobs.length !== 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[...alljobs]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .slice(0, 6)
              .map((job) => (
                <LatestJobCards key={job._id} job={job} />
              ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No jobs found
            </h3>
            <p className="text-muted-foreground">
              Check back later for new opportunities
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default LatestJobs;
