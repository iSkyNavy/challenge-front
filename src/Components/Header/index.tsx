import { Separator } from "../Separator";
import styles from "./index.module.scss";

export const Header = () => {
  const menuModulesList = [
    {
      label: "Dashboard",
      active: false,
      select: false,
    },
    {
      label: "Organización",
      active: true,
      select: false,
    },
    {
      label: "Modelos",
      active: false,
      select: true,
    },
    {
      label: "Seguimiento",
      active: false,
      select: true,
    },
  ];
  return (
    <header>
      <div className={styles.HeaderContainer}>
        <div className={styles.HeaderContainerModules}>
          <div className={styles.HeaderContainerModule}>
            <img src="/mandu_logo_white.svg" />
            <Separator />
          </div>
          {menuModulesList.map((menu, i) => (
            <div className={styles.HeaderContainerModule}>
              <div
                className={`${styles.HeaderContainerModuleButton} ${
                  menu.active && styles.HeaderContainerModuleButtonActive
                }`}
              >
                <span key={i}>{menu.label}</span>
                {menu.select && <img src="/arrow.svg" />}
              </div>

              <Separator />
            </div>
          ))}
        </div>
        <div className={styles.HeaderContainerActionsContent}>
          <div className={styles.HeaderContainerActions}>
            <div className={styles.HeaderContainerAction}>
              <img src="/work.svg" />

              <Separator />
            </div>
            <div className={styles.HeaderContainerAction}>
              <img src="/question.svg" />

              <Separator />
            </div>
            <div className={styles.HeaderContainerAction}>
              <img src="/notification.png" />

              <Separator />
            </div>
          </div>
          <div className={styles.HeaderContainerActionUser}>
            <img src="/logo_admin.png" width={38} height={38} />
            <span>Administrador</span>
            <img src="/arrow.svg" />
          </div>
          <div className={styles.HeaderContainerActionLogo}>
            <img src="/mandu_logo_black.svg" />
          </div>
        </div>
      </div>
    </header>
  );
};
