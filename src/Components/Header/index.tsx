import styles from "./index.module.scss";

export const Header = () => {
  const menuList = [
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
          <img src="/mandu_logo_white.svg" />
          {menuList.map((menu, i) => (
            <div>
              <span key={i}>{menu.label}</span>
              {menu.select && <img src="/arrow.svg" />}
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </header>
  );
};
