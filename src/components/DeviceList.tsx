import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import DeviceCard from "./DeviceCard";
import { useToast } from "@/hooks/use-toast";

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

interface DeviceResponse {
  response: DeviceData[];
}

const DeviceList = () => {
  const [devices, setDevices] = useState<DeviceData[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<DeviceData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDevices(devices);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = devices.filter(
        (device) =>
          device.device.toLowerCase().includes(query) ||
          device.oem.toLowerCase().includes(query) ||
          device.maintainer.toLowerCase().includes(query)
      );
      setFilteredDevices(filtered);
    }
  }, [searchQuery, devices]);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      // For now, load from local file. User can replace this URL with their GitHub repo
      const response = await fetch('/devices/pipa.json');
      const data: DeviceResponse = await response.json();
      setDevices(data.response);
      setFilteredDevices(data.response);
    } catch (error) {
      console.error('Error fetching devices:', error);
      toast({
        title: "Error",
        description: "Failed to load device list. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Supported Devices
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find your device and download the latest MistOS build
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by device, brand, or maintainer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 bg-card/50 backdrop-blur border-primary/20 focus:border-primary/50"
            />
          </div>
        </div>

        {/* Device Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredDevices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map((device, index) => (
              <div 
                key={device.device}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DeviceCard device={device} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No devices found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DeviceList;
