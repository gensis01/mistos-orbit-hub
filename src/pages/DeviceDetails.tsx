import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download, Calendar, HardDrive, User, Shield, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

interface DeviceData {
  maintainer: string;
  oem: string;
  device: string;
  filename: string;
  download: string;
  timestamp: number;
  md5: string;
  sha256: string;
  size: number;
  version: string;
  buildtype: string;
  forum: string;
  recovery: string;
  paypal: string;
  telegram: string;
}

const DeviceDetails = () => {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [device, setDevice] = useState<DeviceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  // Dummy screenshot URLs - user will replace these
  const screenshots = [
    "https://placeholder-screenshot.com/screenshot1.png",
    "https://placeholder-screenshot.com/screenshot2.png",
    "https://placeholder-screenshot.com/screenshot3.png",
    "https://placeholder-screenshot.com/screenshot4.png",
  ];

  useEffect(() => {
    fetchDeviceDetails();
  }, [deviceId]);

  const fetchDeviceDetails = async () => {
    try {
      setLoading(true);
      const repoUrl = 'https://api.github.com/repos/MistOS-Devices/official_devices/contents';
      const response = await fetch(repoUrl);
      const files = await response.json();
      
      const deviceFile = files.find((file: any) => file.name === `${deviceId}.json`);
      
      if (deviceFile) {
        const fileResponse = await fetch(deviceFile.download_url);
        const deviceData = await fileResponse.json();
        setDevice(deviceData.response[0]);
      } else {
        toast({
          title: "Device not found",
          description: "The requested device could not be found.",
          variant: "destructive",
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching device:', error);
      toast({
        title: "Error",
        description: "Failed to load device details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatSize = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  };

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!device) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {device.oem} {device.device.toUpperCase()}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Device Info */}
          <div className="space-y-8">
            {/* Device Image */}
            <Card className="bg-card/50 backdrop-blur border-primary/20 overflow-hidden">
              <CardContent className="p-8">
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <img 
                    src="https://placeholder-device-image.com/device.png" 
                    alt={`${device.oem} ${device.device}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Device Specs */}
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <h2 className="text-2xl font-bold">Device Information</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Maintainer</p>
                    <p className="font-semibold">{device.maintainer}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="font-semibold">{formatDate(device.timestamp)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <HardDrive className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">File Size</p>
                    <p className="font-semibold">{formatSize(device.size)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Version</p>
                    <Badge variant="outline" className="border-primary/50 text-primary">
                      {device.version}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Download & Screenshots */}
          <div className="space-y-8">
            {/* Download Section */}
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <h2 className="text-2xl font-bold">Download</h2>
                <p className="text-muted-foreground">
                  {device.filename}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--glow-cyan)] transition-all duration-300 h-14 text-lg"
                  onClick={() => window.open(device.download, '_blank')}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download ROM
                </Button>

                {/* Hash Values */}
                <div className="space-y-3 pt-4 border-t border-primary/20">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">MD5</p>
                    <code className="text-xs bg-muted/50 p-2 rounded block break-all">
                      {device.md5}
                    </code>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">SHA256</p>
                    <code className="text-xs bg-muted/50 p-2 rounded block break-all">
                      {device.sha256}
                    </code>
                  </div>
                </div>

                {device.telegram && (
                  <div className="pt-4">
                    <a 
                      href={`https://${device.telegram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-secondary hover:text-primary transition-colors flex items-center gap-2"
                    >
                      📱 Contact Maintainer on Telegram
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Screenshots Section */}
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <h2 className="text-2xl font-bold">Screenshots</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Screenshot Carousel */}
                <div className="relative aspect-[9/19] rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                  <img 
                    src={screenshots[currentScreenshot]} 
                    alt={`Screenshot ${currentScreenshot + 1}`}
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Navigation Buttons */}
                  <button 
                    onClick={prevScreenshot}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={nextScreenshot}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Screenshot Dots */}
                <div className="flex justify-center gap-2">
                  {screenshots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentScreenshot(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentScreenshot 
                          ? 'bg-primary w-8' 
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DeviceDetails;
