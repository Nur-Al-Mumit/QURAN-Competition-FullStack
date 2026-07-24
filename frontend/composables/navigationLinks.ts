export type Role =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "EXAMINER"
  | "VOLUNTEER"
  | "STUDENT";

export interface NavLinkChild {
  title: string;
  icon: string;
  link: string;
  badge?: string | number;
  roles: Role[];
}

export interface NavLinkItem {
  title: string;
  icon: string;
  link: string | null;
  children?: NavLinkChild[];
  roles?: Role[];
}

export const Roles = {
  SUPER_ADMIN: 1,
  ADMIN: 2,
  EXAMINER: 3,
  VOLUNTEER: 4,
  STUDENT: 5,
} as const;

const ROLE_ID_TO_KEY: Record<number, Role> = {
  [Roles.SUPER_ADMIN]: "SUPER_ADMIN",
  [Roles.ADMIN]: "ADMIN",
  [Roles.EXAMINER]: "EXAMINER",
  [Roles.VOLUNTEER]: "VOLUNTEER",
  [Roles.STUDENT]: "STUDENT",
};

const adminLinks: NavLinkItem[] = [
  // Common — visible to all non-student roles
  {
    title: "Dashboard",
    icon: "Dashboard",
    link: "/admin/dashboard",
    roles: ["SUPER_ADMIN", "ADMIN", "EXAMINER", "VOLUNTEER"],
  },
  {
    title: "View Profile",
    icon: "ViewProfile",
    link: "/admin/profile",
    roles: ["SUPER_ADMIN", "ADMIN", "EXAMINER", "VOLUNTEER"],
  },

  // Training group — each child declares which roles can see it
  {
    title: "Training",
    icon: "Circular",
    link: null,
    roles: ["SUPER_ADMIN", "ADMIN", "VOLUNTEER"],
    children: [
      {
        title: "Training Attendance",
        icon: "Circular",
        link: "/admin/training-attendance",
        roles: ["SUPER_ADMIN", "ADMIN", "VOLUNTEER"],
      },
      {
        title: "Attendance Sheet",
        icon: "Circular",
        link: "/admin/training-attendance-view",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "Training Dates",
        icon: "Circular",
        link: "/admin/training-dates",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "Training ID Cards",
        icon: "Circular",
        link: "/admin/training-id-card",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },

  // Primary Selection group — each child declares which roles can see it
  {
    title: "Primary Selection",
    icon: "Circular",
    link: null,
    roles: ["SUPER_ADMIN", "ADMIN", "EXAMINER", "VOLUNTEER"],
    children: [
      {
        title: "Verify Registration",
        icon: "Circular",
        link: "/admin/verify-registration",
        roles: ["SUPER_ADMIN", "ADMIN", "VOLUNTEER"],
      },
      {
        title: "Submit Viva Result",
        icon: "Circular",
        link: "/admin/submit-viva-result",
        roles: ["SUPER_ADMIN", "ADMIN", "EXAMINER"],
      },
    ],
  },

  // Standalone links
  {
    title: "Create Admin",
    icon: "UpdateProfile",
    link: "/admin/create-admin",
    roles: ["SUPER_ADMIN"],
  },

  // Bottom links
  {
    title: "Report Issues",
    icon: "Circular",
    link: "/admin/report-issues",
    roles: ["SUPER_ADMIN", "ADMIN", "EXAMINER", "VOLUNTEER"],
  },
  {
    title: "Log Out",
    icon: "LogOut",
    link: "",
    roles: ["SUPER_ADMIN", "ADMIN", "EXAMINER", "VOLUNTEER"],
  },
];

const studentLinks: NavLinkItem[] = [
  {
    title: "Dashboard",
    icon: "Dashboard",
    link: "/dashboard",
    roles: ["STUDENT"],
  },
  {
    title: "View Profile",
    icon: "ViewProfile",
    link: "/profile",
    roles: ["STUDENT"],
  },
  {
    title: "View Registration",
    icon: "Circular",
    link: "/registration/view",
    roles: ["STUDENT"],
  },
  {
    title: "Update Registration",
    icon: "UpdateProfile",
    link: "/registration",
    roles: ["STUDENT"],
  },
  {
    title: "Registration Token",
    icon: "Circular",
    link: "/registration/token",
    roles: ["STUDENT"],
  },
  {
    title: "Log Out",
    icon: "LogOut",
    link: "",
    roles: ["STUDENT"],
  },
];

function filterByRole(links: NavLinkItem[], roleKey: Role): NavLinkItem[] {
  return links
    .filter((item) => !item.roles || item.roles.includes(roleKey))
    .map((item) => {
      if (!item.children) return item;

      const visibleChildren = item.children.filter((child) =>
        child.roles.includes(roleKey),
      );

      // Drop the group entirely if no children are visible
      if (visibleChildren.length === 0) return null;

      return { ...item, children: visibleChildren };
    })
    .filter((item): item is NavLinkItem => item !== null);
}

export const useNavigationLinks = () => {
  const getLinksForRole = (roleId: number): NavLinkItem[] => {
    const roleKey = ROLE_ID_TO_KEY[roleId];
    if (!roleKey) return [];

    return roleKey === "STUDENT"
      ? filterByRole(studentLinks, roleKey)
      : filterByRole(adminLinks, roleKey);
  };

  return {
    Roles,
    getLinksForRole,
  };
};
