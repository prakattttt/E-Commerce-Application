import { motion } from "framer-motion";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

import { fadeUp } from "../../../animations";

const team = [
  {
    name: "Alex Carter",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
    bio: "Passionate about building beautiful digital shopping experiences that customers genuinely enjoy.",
  },
  {
    name: "Sophia Williams",
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
    bio: "Designs elegant interfaces that combine aesthetics with effortless usability across every device.",
  },
  {
    name: "Daniel Lee",
    role: "Full Stack Developer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
    bio: "Focused on creating fast, secure, and scalable experiences from frontend to backend.",
  },
];

const AboutTeam = () => {
  return (
    <section className="py-5">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <h2 className="font-display text-4xl font-bold">Meet Our Team</h2>

        <p className="mt-4 leading-7 text-muted-foreground">
          Behind ShopSphere is a passionate team dedicated to building an
          enjoyable, secure, and modern shopping experience.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            whileHover={{
              y: -8,
            }}
            className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
          >
            <img
              src={member.image}
              alt={member.name}
              className="h-80 w-full object-cover"
            />

            <div className="p-6">
              <h3 className="font-display text-2xl font-bold">{member.name}</h3>

              <p className="mt-1 font-medium text-primary">{member.role}</p>

              <p className="mt-4 leading-7 text-muted-foreground">
                {member.bio}
              </p>

              <div className="mt-6 flex gap-3">
                <button className="rounded-xl bg-secondary p-2 transition hover:bg-primary hover:text-white">
                  <FaGithub size={18} />
                </button>

                <button className="rounded-xl bg-secondary p-2 transition hover:bg-primary hover:text-white">
                  <FaFacebook size={18} />
                </button>

                <button className="rounded-xl bg-secondary p-2 transition hover:bg-primary hover:text-white">
                  <FaInstagram size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutTeam;
