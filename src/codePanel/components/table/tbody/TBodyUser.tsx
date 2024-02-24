"use client";
import { changeUserIsActive } from "@/actions/codePanel/admin/changeUserIsActive";
import { changeUserRole } from "@/actions/codePanel/admin/changeUserRole";
import { User } from "@prisma/client";

interface Props {
  user: User;
}

export const TBodyUser = (props: Props) => {
  const { user } = props;
  const isActive = user.isActive ? "true" : "false";

  return (
    <tr key={user.id}>
      <td className="px-3.5 py-2">{user.fullName}</td>
      <td className="px-3.5 py-2">{user.email}</td>
      <td className="px-3.5 py-2">
        <select
          value={isActive}
          onChange={(e) => changeUserIsActive(user.id, e.target.value)}
          className="text-sm w-full p-2 text-gray-900"
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </td>
      <td className="px-3.5 py-2">
        <select
          value={user.role}
          onChange={(e) => changeUserRole(user.id, e.target.value)}
          className="text-sm w-full p-2 text-gray-900"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="operator">Operator</option>
        </select>
      </td>
    </tr>
  );
};
