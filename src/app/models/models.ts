export class User {
  static fromFireBase({
    email,
    uid,
    name,
    menus,
  }: {
    email: string;
    uid: string;
    name: string;
    menus: Menu[];
  }): User {
    return new User(uid, name, email, menus);
  }

  constructor(
    public uid: string | undefined | null,
    public name: string | undefined | null,
    public email: string | undefined | null,
    public menus: Menu[]
  ) {}
}

export interface MenuTitle {
  name?: string;
  icon: string;
}

export interface Menu extends MenuTitle {
  menuID: string;
  values: NavMenu[];
}

export interface NavMenu extends MenuTitle {
  id: number;
  path: string;
}
