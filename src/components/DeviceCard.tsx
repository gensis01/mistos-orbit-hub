import { Download, User, Calendar, HardDrive } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

interface DeviceCardProps {
  device: DeviceData;
}

const DeviceCard = ({ device }: DeviceCardProps) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSize = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  };

  return (
    <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--glow-cyan)] group">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
              {device.oem} {device.device.toUpperCase()}
            </h3>
            <p className="text-sm text-muted-foreground">Codename: {device.device}</p>
          </div>
          <Badge variant="outline" className="border-primary/50 text-primary">
            {device.version}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Maintained by:</span>
          <span className="font-medium">{device.maintainer}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Updated:</span>
          <span className="font-medium">{formatDate(device.timestamp)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <HardDrive className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Size:</span>
          <span className="font-medium">{formatSize(device.size)}</span>
        </div>

        {device.telegram && (
          <div className="pt-2">
            <a 
              href={`https://${device.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-secondary hover:text-primary transition-colors"
            >
              📱 Contact on Telegram
            </a>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--glow-cyan)] transition-all duration-300"
          onClick={() => window.open(device.download, '_blank')}
        >
          <Download className="mr-2 h-4 w-4" />
          Download ROM
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeviceCard;
