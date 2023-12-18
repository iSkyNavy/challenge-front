/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs } from "antd";
import { Header } from "./Components/Header";
import styles from "./App.module.scss";
import { Content } from "./Components/Content";
import { useEffect } from "react";
import { useTableHook } from "./Utils/hooks/UseTableHook";
import { IDivisionWithPagination } from "./API/models/Division";

function App() {
  const {
    divisions,
    getDivisions,
    isLoading,
    getDivisionsName,
    divisionsName,
    getDivisionsSuperiorName,
    divisionsSuperiorsName,
  } = useTableHook();
  const onChange = (key: string) => {
    console.log(key);
  };

  useEffect(() => {
    getDivisions({ per_page: 10 });
    getDivisionsName();
    getDivisionsSuperiorName();
  }, []);
  return (
    <div>
      <Header />
      <div className={styles.TabsHeader}>
        <h3 className={styles.TabsHeaderTitle}>Organización</h3>
        <div className={styles.TabsActions}>
          <img src="/boton_plus.png" width={28} height={28} />
          <img src="/importar.png" width={28} height={28} />
          <img src="/exportar.png" width={28} height={28} />
        </div>
      </div>
      <div>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Divisiones",
              children: (
                <Content
                  data={divisions as IDivisionWithPagination}
                  isLoading={isLoading}
                  getDivisions={getDivisions}
                  divisionsName={divisionsName}
                  divisionsSuperiorsName={divisionsSuperiorsName}
                />
              ),
            },
            {
              key: "2",
              label: "Colaboradores",
              disabled: true,
            },
          ]}
          onChange={onChange}
          tabBarStyle={{ padding: "0 25px", margin: 0 }}
        />
      </div>
    </div>
  );
}

export default App;
