import { Github, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  github?: string;
  telegram?: string;
}

const Team = () => {
  const navigate = useNavigate();

  // Dummy team data - user can customize this
  const teamMembers: TeamMember[] = [
    {
      name: "Team Member 1",
      role: "Lead Developer",
      avatar: "https://placeholder-avatar.com/avatar1.png",
      github: "https://github.com/member1",
      telegram: "https://t.me/member1"
    },
    {
      name: "Team Member 2",
      role: "Core Developer",
      avatar: "https://placeholder-avatar.com/avatar2.png",
      github: "https://github.com/member2",
      telegram: "https://t.me/member2"
    },
    {
      name: "Team Member 3",
      role: "Maintainer",
      avatar: "https://placeholder-avatar.com/avatar3.png",
      github: "https://github.com/member3",
      telegram: "https://t.me/member3"
    },
    {
      name: "Team Member 4",
      role: "Designer",
      avatar: "https://placeholder-avatar.com/avatar4.png",
      github: "https://github.com/member4",
      telegram: "https://t.me/member4"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div 
              className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-pointer"
              onClick={() => navigate('/')}
            >
              MistOS
            </div>
            <div className="flex gap-6">
              <Button variant="ghost" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button variant="ghost" onClick={() => navigate('/#devices')}>
                Devices
              </Button>
              <Button variant="ghost" onClick={() => navigate('/team')}>
                Team
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-fade-in">
            Meet Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            The passionate individuals behind MistOS
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={index}
                className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--glow-cyan)] group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  {/* Avatar */}
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3 pt-2">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-card border border-primary/30 hover:border-primary/50 flex items-center justify-center hover:shadow-[var(--glow-cyan)] transition-all duration-300"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {member.telegram && (
                      <a
                        href={member.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-card border border-primary/30 hover:border-primary/50 flex items-center justify-center hover:shadow-[var(--glow-cyan)] transition-all duration-300"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="bg-card/50 backdrop-blur border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-12 space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Want to Join Us?
              </h2>
              <p className="text-muted-foreground">
                We're always looking for talented individuals to help improve MistOS. 
                If you're passionate about Android development, join our community!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--glow-cyan)] transition-all duration-300"
                  onClick={() => window.open('https://github.com/MistOS-Devices', '_blank')}
                >
                  <Github className="mr-2 h-4 w-4" />
                  Contribute on GitHub
                </Button>
                <Button 
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10"
                  onClick={() => window.open('https://t.me/MistOS_Official', '_blank')}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Join Telegram
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
