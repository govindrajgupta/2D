import makeKaplayCtx from "./kaplayCtx";
import makePlayer from "./entities/Player";
import makeSection from "./components/Section";
import { PALETTE } from "./constants";
import makeSocialIcon from "./components/SocialIcon";
import makeSkillIcon from "./components/SkillIcon";
import { makeAppear } from "./utils";
import makeWorkExperienceCard from "./components/WorkExperienceCard";
import makeEmailIcon from "./components/EmailIcon";
import makePhoneIcon from "./components/PhoneIcon";
import makeProjectCard from "./components/ProjectCard";
import { cameraZoomValueAtom, store } from "./store";

export default async function initGame() {
  try {
    const generalDataResponse = await fetch("/new-2d-portfolio/configs/generalData.json");
    if (!generalDataResponse.ok) {
      throw new Error(`Failed to fetch generalData.json: ${generalDataResponse.status}`);
    }
    const generalData = await generalDataResponse.json();
    
    const skillsDataResponse = await fetch("/new-2d-portfolio/configs/skillsData.json");
    if (!skillsDataResponse.ok) {
      throw new Error(`Failed to fetch skillsData.json: ${skillsDataResponse.status}`);
    }
    const skillsData = await skillsDataResponse.json();
    
    const socialsDataResponse = await fetch("/new-2d-portfolio/configs/socialsData.json");
    if (!socialsDataResponse.ok) {
      throw new Error(`Failed to fetch socialsData.json: ${socialsDataResponse.status}`);
    }
    const socialsData = await socialsDataResponse.json();
    
    const experiencesDataResponse = await fetch("/new-2d-portfolio/configs/experiencesData.json");
    if (!experiencesDataResponse.ok) {
      throw new Error(`Failed to fetch experiencesData.json: ${experiencesDataResponse.status}`);
    }
    const experiencesData = await experiencesDataResponse.json();
    
    const projectsDataResponse = await fetch("/new-2d-portfolio/configs/projectsData.json");
    if (!projectsDataResponse.ok) {
      throw new Error(`Failed to fetch projectsData.json: ${projectsDataResponse.status}`);
    }
    const projectsData = await projectsDataResponse.json();

  const k = makeKaplayCtx();
  k.loadSprite("player", "/new-2d-portfolio/sprites/player.png", {
    sliceX: 4,
    sliceY: 8,
    anims: {
      "walk-down-idle": 0,
      "walk-down": { from: 0, to: 3, loop: true },
      "walk-left-down": { from: 4, to: 7, loop: true },
      "walk-left-down-idle": 4,
      "walk-left": { from: 8, to: 11, loop: true },
      "walk-left-idle": 8,
      "walk-left-up": { from: 12, to: 15, loop: true },
      "walk-left-up-idle": 12,
      "walk-up": { from: 16, to: 19, loop: true },
      "walk-up-idle": 16,
      "walk-right-up": { from: 20, to: 23, loop: true },
      "walk-right-up-idle": 20,
      "walk-right": { from: 24, to: 27, loop: true },
      "walk-right-idle": 24,
      "walk-right-down": { from: 28, to: 31, loop: true },
      "walk-right-down-idle": 28,
    },
  });
  k.loadFont("ibm-regular", "/new-2d-portfolio/fonts/IBMPlexSans-Regular.ttf");
  k.loadFont("ibm-bold", "/new-2d-portfolio/fonts/IBMPlexSans-Bold.ttf");
  k.loadSprite("github-logo", "/new-2d-portfolio/logos/github-logo.png");
  k.loadSprite("linkedin-logo", "/new-2d-portfolio/logos/linkedin-logo.png");
  k.loadSprite("youtube-logo", "/new-2d-portfolio/logos/youtube-logo.png");
  k.loadSprite("x-logo", "/new-2d-portfolio/logos/x-logo.png");
  k.loadSprite("substack-logo", "/new-2d-portfolio/logos/substack-logo.png");
  k.loadSprite("javascript-logo", "/new-2d-portfolio/logos/js-logo.png");
  k.loadSprite("typescript-logo", "/new-2d-portfolio/logos/ts-logo.png");
  k.loadSprite("react-logo", "/new-2d-portfolio/logos/react-logo.png");
  k.loadSprite("nextjs-logo", "/new-2d-portfolio/logos/nextjs-logo.png");
  k.loadSprite("postgres-logo", "/new-2d-portfolio/logos/postgres-logo.png");
  k.loadSprite("html-logo", "/new-2d-portfolio/logos/html-logo.png");
  k.loadSprite("css-logo", "/new-2d-portfolio/logos/css-logo.png");
  k.loadSprite("tailwind-logo", "/new-2d-portfolio/logos/tailwind-logo.png");
  k.loadSprite("python-logo", "/new-2d-portfolio/logos/python-logo.png");
  k.loadSprite("email-logo", "/new-2d-portfolio/logos/email-logo.png");
  k.loadSprite("sonic-js", "/new-2d-portfolio/projects/sonic-js.png");
  k.loadSprite("kirby-ts", "/new-2d-portfolio/projects/kirby-ts.png");
  k.loadSprite("platformer-js", "/new-2d-portfolio/projects/platformer-js.png");
  k.loadShaderURL("tiledPattern", null, "/new-2d-portfolio/shaders/tiledPattern.frag");

  const setInitCamZoomValue = () => {
    if (k.width() < 1000) {
      k.camScale(k.vec2(0.5));
      store.set(cameraZoomValueAtom, 0.5);
      return;
    }
    k.camScale(k.vec2(0.8));
    store.set(cameraZoomValueAtom, 0.8);
  };
  setInitCamZoomValue();

  k.onUpdate(() => {
    const cameraZoomValue = store.get(cameraZoomValueAtom);
    if (cameraZoomValue !== k.camScale().x) k.camScale(k.vec2(cameraZoomValue));
  });

  const tiledBackground = k.add([
    k.uvquad(k.width(), k.height()),
    k.shader("tiledPattern", () => ({
      u_time: k.time() / 20,
      u_color1: k.Color.fromHex(PALETTE.color3),
      u_color2: k.Color.fromHex(PALETTE.color6),
      u_speed: k.vec2(0.5, -0.3),
      u_aspect: k.width() / k.height(),
      u_size: 8,
    })),
    k.pos(0, 0),
    k.fixed(),
  ]);

  // Add floating clouds
  const clouds = [];
  for (let i = 0; i < 6; i++) {
    const cloud = k.add([
      k.circle(60 + Math.random() * 40),
      k.color(k.Color.fromHex(PALETTE.color5)),
      k.pos(Math.random() * k.width(), Math.random() * 300 - 150),
      k.opacity(0.7),
      k.fixed(),
      k.z(-1),
    ]);
    
    // Add smaller cloud parts for more realistic look
    const smallCloud1 = k.add([
      k.circle(30 + Math.random() * 20),
      k.color(k.Color.fromHex(PALETTE.color5)),
      k.pos(cloud.pos.x + 40, cloud.pos.y + 10),
      k.opacity(0.6),
      k.fixed(),
      k.z(-1),
    ]);
    
    const smallCloud2 = k.add([
      k.circle(25 + Math.random() * 15),
      k.color(k.Color.fromHex(PALETTE.color5)),
      k.pos(cloud.pos.x - 30, cloud.pos.y + 5),
      k.opacity(0.5),
      k.fixed(),
      k.z(-1),
    ]);
    
    clouds.push({ main: cloud, small1: smallCloud1, small2: smallCloud2, speed: 0.2 + Math.random() * 0.3 });
  }

  // Add weather particles (light rain/mist effect)
  const weatherParticles = [];
  for (let i = 0; i < 50; i++) {
    const particle = k.add([
      k.rect(1, 8 + Math.random() * 12),
      k.color(k.Color.fromHex(PALETTE.color6)),
      k.pos(Math.random() * k.width(), Math.random() * k.height()),
      k.opacity(0.3),
      k.fixed(),
      k.z(-2),
    ]);
    weatherParticles.push({
      particle,
      speed: 2 + Math.random() * 1.5,
      wind: 0.5 + Math.random() * 0.5
    });
  }

  tiledBackground.onUpdate(() => {
    tiledBackground.width = k.width();
    tiledBackground.height = k.height();
    tiledBackground.uniform.u_aspect = k.width() / k.height();
  });

  // Update clouds animation
  k.onUpdate(() => {
    clouds.forEach(cloudGroup => {
      cloudGroup.main.pos.x += cloudGroup.speed;
      cloudGroup.small1.pos.x += cloudGroup.speed;
      cloudGroup.small2.pos.x += cloudGroup.speed;
      
      // Reset cloud position when it goes off screen
      if (cloudGroup.main.pos.x > k.width() + 100) {
        cloudGroup.main.pos.x = -100;
        cloudGroup.small1.pos.x = -60;
        cloudGroup.small2.pos.x = -130;
        cloudGroup.main.pos.y = Math.random() * 300 - 150;
        cloudGroup.small1.pos.y = cloudGroup.main.pos.y + 10;
        cloudGroup.small2.pos.y = cloudGroup.main.pos.y + 5;
      }
    });

    // Update weather particles
    weatherParticles.forEach(p => {
      p.particle.pos.y += p.speed;
      p.particle.pos.x += p.wind;
      
      // Reset particle when it goes off screen
      if (p.particle.pos.y > k.height() + 20) {
        p.particle.pos.y = -20;
        p.particle.pos.x = Math.random() * k.width();
      }
      if (p.particle.pos.x > k.width() + 10) {
        p.particle.pos.x = -10;
      }
    });
  });

  makeSection(
    k,
    k.vec2(k.center().x, k.center().y - 400),
    generalData.section1Name,
    (parent) => {
      // Add a subtle background card for the about section
      const sectionBg = parent.add([
        k.rect(1200, 800),
        k.color(k.Color.fromHex(PALETTE.color5)),
        k.opacity(0.1),
        k.pos(-600, -400),
        k.z(-1),
      ]);

      const container = parent.add([k.pos(-805, -700), k.opacity(0)]);

      // Enhanced title with shadow effect
      const titleShadow = container.add([
        k.text(generalData.header.title, { font: "ibm-bold", size: 88 }),
        k.color(k.Color.fromHex(PALETTE.color4)),
        k.pos(397, 2),
        k.opacity(0.3),
      ]);

      const title = container.add([
        k.text(generalData.header.title, { font: "ibm-bold", size: 88 }),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.pos(395, 0),
        k.opacity(0),
      ]);

      // Enhanced subtitle with better spacing
      const subtitle = container.add([
        k.text(generalData.header.subtitle, {
          font: "ibm-bold",
          size: 48,
        }),
        k.color(k.Color.fromHex(PALETTE.color2)),
        k.pos(485, 120),
        k.opacity(0),
      ]);

      // Add decorative line under subtitle
      const decorativeLine = container.add([
        k.rect(300, 4),
        k.color(k.Color.fromHex(PALETTE.color4)),
        k.pos(485, 180),
        k.opacity(0),
      ]);

      const socialContainer = container.add([k.pos(130, 0), k.opacity(0)]);

      for (const socialData of socialsData) {
        if (socialData.name === "Email") {
          makeEmailIcon(
            k,
            socialContainer,
            k.vec2(socialData.pos.x, socialData.pos.y),
            socialData.logoData,
            socialData.name,
            socialData.address
          );
          continue;
        }

        if (socialData.name === "Phone") {
          makePhoneIcon(
            k,
            socialContainer,
            k.vec2(socialData.pos.x, socialData.pos.y),
            socialData.logoData,
            socialData.name,
            socialData.address
          );
          continue;
        }

        makeSocialIcon(
          k,
          socialContainer,
          k.vec2(socialData.pos.x, socialData.pos.y),
          socialData.logoData,
          socialData.name,
          socialData.link,
          socialData.description
        );
      }

      makeAppear(k, container);
      makeAppear(k, socialContainer);
    }
  );
  makeSection(
    k,
    k.vec2(k.center().x - 400, k.center().y),
    generalData.section2Name,
    (parent) => {
      /* make the container independent of the section
       so that the skill icons appear on top of every section's children.
       so that when the skill icons are pushed around by the player
       they always remain on top */
      
      // Add floating skill background elements
      const skillBg = k.add([
        k.circle(400),
        k.color(k.Color.fromHex(PALETTE.color2)),
        k.opacity(0.05),
        k.pos(parent.pos.x - 300, parent.pos.y),
        k.z(-1),
      ]);

      const skillBg2 = k.add([
        k.circle(250),
        k.color(k.Color.fromHex(PALETTE.color4)),
        k.opacity(0.03),
        k.pos(parent.pos.x - 100, parent.pos.y + 100),
        k.z(-1),
      ]);

      const container = k.add([
        k.opacity(0),
        k.pos(parent.pos.x - 300, parent.pos.y),
      ]);

      for (const skillData of skillsData) {
        makeSkillIcon(
          k,
          container,
          k.vec2(skillData.pos.x, skillData.pos.y),
          skillData.logoData,
          skillData.name
        );
      }

      // Add subtle animation to background elements
      skillBg.onUpdate(() => {
        skillBg.angle += 0.5;
      });

      skillBg2.onUpdate(() => {
        skillBg2.angle -= 0.3;
      });

      makeAppear(k, container);
    }
  );
  makeSection(
    k,
    k.vec2(k.center().x + 400, k.center().y),
    generalData.section3Name,
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(0)]);
      for (const experienceData of experiencesData) {
        makeWorkExperienceCard(
          k,
          container,
          k.vec2(experienceData.pos.x, experienceData.pos.y),
          experienceData.cardHeight,
          experienceData.roleData
        );
      }

      makeAppear(k, container);
    }
  );
  makeSection(
    k,
    k.vec2(k.center().x, k.center().y + 400),
    generalData.section4Name,
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(0, 0)]);

      for (const project of projectsData) {
        makeProjectCard(
          k,
          container,
          k.vec2(project.pos.x, project.pos.y),
          project.data,
          project.thumbnail
        );
      }

      makeAppear(k, container);
    }
  );

  makePlayer(k, k.vec2(k.center()), 350);
  
  } catch (error) {
    console.error("Failed to initialize game:", error);
    // You could show an error message to the user here
    throw error;
  }
}
