import CameraController from "./reactComponents/CameraController";
import SocialModal from "./reactComponents/SocialModal";
import EmailModal from "./reactComponents/EmailModal";
import PhoneModal from "./reactComponents/PhoneModal";
import ProjectModal from "./reactComponents/ProjectModal";

export default function ReactUI() {
  return (
    <>
      <p className="controls-message">Tap/Click around to move</p>
      <CameraController />
      <SocialModal />
      <EmailModal />
      <PhoneModal />
      <ProjectModal />
    </>
  );
}
