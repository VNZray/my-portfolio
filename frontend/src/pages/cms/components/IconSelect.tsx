import { Box, FormControl, FormLabel, Option, Select } from "@mui/joy";

// Social platform icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import RedditIcon from "@mui/icons-material/Reddit";
import TelegramIcon from "@mui/icons-material/Telegram";
import LanguageIcon from "@mui/icons-material/Language";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import PaletteIcon from "@mui/icons-material/Palette";

// Achievement / general icons
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import RocketIcon from "@mui/icons-material/Rocket";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CodeIcon from "@mui/icons-material/Code";
import BrushIcon from "@mui/icons-material/Brush";
import BuildIcon from "@mui/icons-material/Build";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import VerifiedIcon from "@mui/icons-material/Verified";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FlagIcon from "@mui/icons-material/Flag";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export const ICON_MAP: Record<string, React.ReactElement> = {
  // Socials
  Facebook: <FacebookIcon />,
  Instagram: <InstagramIcon />,
  LinkedIn: <LinkedInIcon />,
  GitHub: <GitHubIcon />,
  Twitter: <TwitterIcon />,
  YouTube: <YouTubeIcon />,
  Reddit: <RedditIcon />,
  Telegram: <TelegramIcon />,
  Website: <LanguageIcon />,
  TikTok: <MusicNoteIcon />,
  Discord: <SportsEsportsIcon />,
  Dribbble: <SportsBasketballIcon />,
  Behance: <PaletteIcon />,

  // Achievements
  EmojiEvents: <EmojiEventsIcon />,
  RocketLaunch: <RocketLaunchIcon />,
  Rocket: <RocketIcon />,
  School: <SchoolIcon />,
  Star: <StarIcon />,
  WorkspacePremium: <WorkspacePremiumIcon />,
  MilitaryTech: <MilitaryTechIcon />,
  Code: <CodeIcon />,
  Brush: <BrushIcon />,
  Build: <BuildIcon />,
  Lightbulb: <LightbulbIcon />,
  TrendingUp: <TrendingUpIcon />,
  Groups: <GroupsIcon />,
  Public: <PublicIcon />,
  Verified: <VerifiedIcon />,
  AutoAwesome: <AutoAwesomeIcon />,
  Flag: <FlagIcon />,
  TaskAlt: <TaskAltIcon />,
};

export type IconCategory = "social" | "achievement";

const SOCIAL_ICONS = [
  "Facebook",
  "Instagram",
  "LinkedIn",
  "GitHub",
  "Twitter",
  "YouTube",
  "Reddit",
  "Telegram",
  "Website",
  "TikTok",
  "Discord",
  "Dribbble",
  "Behance",
];

const ACHIEVEMENT_ICONS = [
  "EmojiEvents",
  "RocketLaunch",
  "Rocket",
  "School",
  "Star",
  "WorkspacePremium",
  "MilitaryTech",
  "Code",
  "Brush",
  "Build",
  "Lightbulb",
  "TrendingUp",
  "Groups",
  "Public",
  "Verified",
  "AutoAwesome",
  "Flag",
  "TaskAlt",
];

interface IconSelectProps {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
  category: IconCategory;
  placeholder?: string;
}

export default function IconSelect({
  label,
  value,
  onChange,
  category,
  placeholder = "Select an icon",
}: IconSelectProps) {
  const iconKeys = category === "social" ? SOCIAL_ICONS : ACHIEVEMENT_ICONS;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select
        value={value ?? ""}
        onChange={(_e, newValue) => onChange(newValue ?? "")}
        placeholder={placeholder}
        renderValue={(selected) => {
          const icon = ICON_MAP[selected?.value as string];
          return icon ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {icon}
              {selected?.value}
            </Box>
          ) : null;
        }}
      >
        {iconKeys.map((name) => (
          <Option key={name} value={name}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {ICON_MAP[name]}
              {name}
            </Box>
          </Option>
        ))}
      </Select>
    </FormControl>
  );
}
