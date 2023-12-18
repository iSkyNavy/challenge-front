/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Radio, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/es/table";
import {
  DivisionParams,
  IDivision,
  IDivisionWithPagination,
} from "../../API/models/Division";
import { FilterValue } from "antd/es/table/interface";

interface ITableProps {
  data: IDivisionWithPagination;
  isLoading: boolean;
  getDivisions: (params: DivisionParams) => Promise<void>;
  divisionsName: string[];
  divisionsSuperiorsName: string[];
}
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}
interface DataType {
  name: string;
  level: number;
  divisionSuperior: IDivision;
  ambassadorName?: string;
  subDivisionsCount?: number;
  collaboratorsCount: number;
}
const buttonOptions = [
  {
    label: "Listado",
    value: "listado",
  },
  {
    label: "Árbol",
    value: "arbol",
  },
];

export const Content: FC<ITableProps> = ({
  data,
  isLoading,
  getDivisions,
  divisionsName,
  divisionsSuperiorsName,
}) => {
  const [type, setType] = useState("listado");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: data?.meta?.current_page,
      pageSize: data?.meta?.per_page,
      total: data?.meta?.total,
    },
  });
  const columns: ColumnsType<DataType> = [
    {
      title: "División",
      dataIndex: "name",
      filterSearch: true,
      filters: divisionsName.map((name: string) => {
        const obj = {
          text: name,
          value: name,
        };
        return obj;
      }),
      onFilter: (value, record) => record.name.includes(value as string),
    },
    {
      title: "División superior",
      dataIndex: "divisionSuperiorName",
      filterSearch: true,
      filters: divisionsSuperiorsName.map((name: string) => {
        const obj = {
          text: name,
          value: name,
        };
        return obj;
      }),
      onFilter: (value, record) =>
        record?.divisionSuperior?.name.includes(value as string),
      render(_value, record) {
        if (!record.divisionSuperior) return "-";
        return record.divisionSuperior.name;
      },
    },
    {
      title: "Colaboradores",
      dataIndex: "collaboratorsCount",
      sorter: (a, b) => a.collaboratorsCount - b.collaboratorsCount,
      render(value, record) {
        if (!record.collaboratorsCount) return "-";
        return value;
      },
    },
    {
      title: "Nivel",
      dataIndex: "level",
      sorter: (a, b) => a.level - b.level,
    },
    {
      title: "Subdivisiones",
      dataIndex: "subDivisionsCount",
      sorter: (a, b) => {
        if (a.subDivisionsCount && b.subDivisionsCount) {
          return a.subDivisionsCount - b.subDivisionsCount;
        } else {
          return 0;
        }
      },
      render(value, record) {
        if (!record.subDivisionsCount) return "-";
        return (
          <div className={styles.SubDivisionCol}>
            <span>{value}</span> <div className={styles.ButtonPluss}>+</div>
          </div>
        );
      },
    },
    {
      title: "Embajadores",
      dataIndex: "ambassadorName",
      render(value, record) {
        if (!record.ambassadorName) return "-";
        return value;
      },
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onChangeTable: TableProps<DataType>["onChange"] = async (
    pagination,
    filters,
    sorter: any,
    extra
  ) => {
    let sorterParams = "";
    let pageParam = 1;

    if (extra.action == "sort") {
      pageParam = 1;
    } else {
      pageParam = pagination.current ?? 1;
    }
    if (sorter && sorter?.field) {
      sorterParams = `${sorter.field},${
        sorter.order == "ascend" ? "asc" : "desc"
      }`;
    }
    await getDivisions({
      per_page: pagination.pageSize,
      page: pageParam,
      name: filters.name ? (filters.name as string | string[]) : undefined,
      divisionSuperiorName: filters.divisionSuperiorName
        ? (filters.divisionSuperiorName as string | string[])
        : undefined,
      sort: sorterParams ? sorterParams : undefined,
    });
    // }
  };

  useEffect(() => {
    setTableParams({
      pagination: {
        // ...tableParams.pagination,
        current: data?.meta?.current_page,
        pageSize: data?.meta?.per_page,
        total: data?.meta?.total,
      },
    });
  }, [data]);
  return (
    <div className={styles.Table}>
      <Radio.Group value={type} onChange={(e) => setType(e.target.value)}>
        {buttonOptions.map((button, index) => (
          <Radio.Button
            className={
              button.value == type
                ? styles.RadioButtonActive
                : styles.RadioButton
            }
            key={index}
            value={button.value}
          >
            {button.label}
          </Radio.Button>
        ))}
      </Radio.Group>
      {data?.data?.length > 0 && (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data.data as DataType[]}
          onChange={onChangeTable}
          loading={isLoading}
          pagination={tableParams.pagination}
          footer={() => (
            <p className={styles.TotalText}>
              Total de Divisiones: {data.meta?.total}
            </p>
          )}
        />
      )}
    </div>
  );
};
