import { Todo } from "./entitiy";
import { Platform } from "react-native";
import { DataSource, DataSourceOptions } from "typeorm";

const isWeb = Platform.OS === "web";
const options: DataSourceOptions = isWeb ? {
    type: "sqljs",
    entities: [Todo],
    synchronize: true,
    autoSave: true,
    location: "youcodia",
    useLocalForage: true
} : {
    database: "youcodia",
    driver: require("expo-sqlite"),
    entities: [Todo],
    synchronize: true,
    type: "expo"
}


const dataSource = new DataSource(options);

export default dataSource;