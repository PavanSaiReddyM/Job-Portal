import React from "react";
import { Carousel, CarouselContent, CarouselNext, CarouselItem, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSearchedQuery } from "../redux/jobslice";

const category = [
  "Frontend Engineer",
  "Backend Engineer",
  "Data Scientist",
  "Graphic Designer",
  "FullStack Developer"
];

const CategoryCarousel = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const searchJobHandler = (query) => {
          dispatch(setSearchedQuery(query));
          navigate("/browse");
      }
  return (
    <div className="my-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Browse by Category</h2>
        <p className="text-text-secondary">Explore jobs across different categories</p>
      </div>
      
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent className="-ml-2 md:-ml-4">
          {category.map((cat, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Button 
              onClick={()=>searchJobHandler(cat)}
                variant="outline" 
                className="w-full cursor-pointer rounded-full border-brand-primary/20 text-text-primary hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-200"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-brand-primary border-brand-primary/20 hover:bg-brand-primary hover:text-white cursor-pointer" />
        <CarouselNext className="text-brand-primary border-brand-primary/20 hover:bg-brand-primary hover:text-white cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;