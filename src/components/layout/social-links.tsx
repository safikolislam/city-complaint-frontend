import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: FaFacebookF,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mdsafikolislam/",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/safikolislam",
    icon: FaGithub,
  },
];

export function SocialLinks() {
  return (
    <ul className="mt-4 flex items-center gap-2">
      {socials.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="grid size-9 place-items-center rounded-full border text-muted-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Icon className="size-4" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}