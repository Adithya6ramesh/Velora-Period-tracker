import { Menu, User } from "lucide-react";
import { Button } from "./ui/button";

export function TopBar() {
  return (
    <div className="w-full bg-white border-b border-pink-100 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-medium text-pink-600">Velora</h1>
        <span className="text-2xl">🌸</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-pink-600 hover:text-pink-700 hover:bg-pink-50">
          <User className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-pink-600 hover:text-pink-700 hover:bg-pink-50">
          <Menu className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}