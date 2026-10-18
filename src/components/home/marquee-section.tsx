"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2, Clock3, Users, Star,
  MapPin, Zap, ShieldCheck, TrendingUp,
} from "lucide-react";

const items = [
  { icon: CheckCircle2, text: "12,400+ Complaints Resolved",  color: "text-emerald-500" },
  { icon: Clock3,       text: "Avg. 3-Day Resolution Time",   color: "text-blue-500"    },
  { icon: Users,        text: "8,200+ Active Citizens",       color: "text-violet-500"  },
  { icon: Star,         text: "4.8 / 5 Citizen Rating",       color: "text-amber-500"   },
  { icon: MapPin,       text: "Covering All Dhaka Zones",     color: "text-rose-500"    },
  { icon: Zap,          text: "Real-Time Status Updates",     color: "text-cyan-500"    },
  { icon: ShieldCheck,  text: "100% Transparent Process",     color: "text-green-500"   },
  { icon: TrendingUp,   text: "38% Faster Than Last Year",    color: "text-orange-500"  },
];

const doubled = [...items, ...items];

export function MarqueeSection() {
  return (
    <div className="relative py-3.5 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800 overflow-hidden">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-white dark:from-gray-950 to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-white dark:from-gray-950 to-transparent" />

      <motion.div
        className="flex items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 px-6 whitespace-nowrap">
            <item.icon className={`w-4 h-4 flex-shrink-0 ${item.color}`} />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {item.text}
            </span>
            <span className="ml-4 w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}