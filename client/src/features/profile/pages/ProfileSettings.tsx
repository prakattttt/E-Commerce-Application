import { User, Lock, Camera, Trash2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const ProfileSettings = () => {
  const navigate = useNavigate();

  const items = [
    {
      icon: User,
      title: "Edit Profile",
      description: "Update your name and email",
      path: "/profile/settings/edit",
    },
    {
      icon: Camera,
      title: "Change Profile Picture",
      description: "Upload a new avatar",
      path: "/profile/settings/picture",
    },
    {
      icon: Lock,
      title: "Change Password",
      description: "Keep your account secure",
      path: "/profile/settings/password",
    },
    {
      icon: Trash2,
      title: "Delete Account",
      description: "This action cannot be undone",
      path: "/profile/settings/delete",
      danger: true,
    },
  ];

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.title}
            type="button"
            onClick={() => navigate(item.path)}
            className={`flex w-full items-center justify-between rounded-2xl border bg-card p-5 text-left transition hover:shadow-sm ${
              item.danger
                ? "border-error/20 hover:bg-error/5"
                : "border-border hover:bg-secondary"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  item.danger
                    ? "bg-error/10 text-error"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <Icon size={22} />
              </div>

              <div>
                <h3
                  className={`font-semibold ${item.danger ? "text-error" : ""}`}
                >
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>

            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
        );
      })}
    </div>
  );
};

export default ProfileSettings;
