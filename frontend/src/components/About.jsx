import React from 'react';
import { ArrowRight, Users, Target, Star, Globe, Badge } from 'lucide-react';
import { Button } from './ui/button';
import { Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,} from './ui/card'
const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            About Us
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Connecting Talent with
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Opportunity</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're on a mission to revolutionize how companies find exceptional talent and how professionals discover their dream careers.
          </p>
          <Button size="lg" className="group">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To bridge the gap between exceptional talent and innovative companies by providing a seamless, 
                  intelligent platform that makes hiring faster, fairer, and more effective for everyone involved.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-6 w-6 text-accent" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To create a world where every professional finds meaningful work that matches their skills and 
                  aspirations, while helping companies build diverse, talented teams that drive innovation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Making an Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Jobs Posted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold  mb-2">5K+</div>
              <div className="text-muted-foreground">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Job Seekers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">98%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-6 w-6 text-primary" />
                  <CardTitle>Inclusivity</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe in creating opportunities for everyone, regardless of background, 
                  experience level, or location.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-6 w-6 text-accent" />
                  <CardTitle>Excellence</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We strive for excellence in every interaction, feature, and outcome 
                  to deliver exceptional value.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-6 w-6 text-primary" />
                  <CardTitle>Innovation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We continuously innovate to solve complex challenges and improve 
                  the hiring experience for all.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Whether you're looking for your next great hire or your dream job, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default">
              For Employers
            </Button>
            <Button size="lg" variant="secondary">
              For Job Seekers
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
