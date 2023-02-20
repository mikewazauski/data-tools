export interface User {
  uid: string;
  email: string | null;
  name: string | null;
  photoUrl: string | null;
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
