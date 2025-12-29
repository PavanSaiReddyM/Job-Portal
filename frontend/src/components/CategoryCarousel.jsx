import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselItem,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobslice";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  BarChart3,
  Palette,
  Layers,
} from "lucide-react";

const categories = [
  { name: "Frontend Engineer", icon: Code },
  { name: "Backend Engineer", icon: Database },
  { name: "Data Scientist", icon: BarChart3 },
  { name: "Graphic Designer", icon: Palette },
  { name: "FullStack Developer", icon: Layers },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <motion.section
      className="py-20 px-4 sm:px-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Browse by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore jobs across different categories
          </p>
        </div>

        {/* Carousel */}
        <Carousel className="w-full">
          <CarouselContent className="-ml-3">
            {categories.map((cat, index) => (
              <CarouselItem
                key={index}
                className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    onClick={() => searchJobHandler(cat.name)}
                    variant="outline"
                    className="w-full h-auto py-6 px-4 rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm 
                               hover:bg-primary hover:text-primary-foreground 
                               hover:border-primary hover:shadow-elegant 
                               transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                        <cat.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <span className="font-medium">{cat.name}</span>
                    </div>
                  </Button>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden sm:flex -left-12 border-border/50 bg-card/80 backdrop-blur-sm 
                                      hover:bg-primary hover:text-primary-foreground hover:border-primary" />
          <CarouselNext className="hidden sm:flex -right-12 border-border/50 bg-card/80 backdrop-blur-sm 
                                  hover:bg-primary hover:text-primary-foreground hover:border-primary" />
        </Carousel>
      </div>
    </motion.section>
  );
};

export default CategoryCarousel;
