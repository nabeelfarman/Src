import { RoleMenuInterface } from "./role-menu-interface";

export class RoleModuleInterface {
    applicationModuleId: string | undefined;
    applicationModuleTitle: string | undefined;
    tempMenuList: RoleMenuInterface[] = [];
}