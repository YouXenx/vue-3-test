// Ambil role user dari localStorage (atau nanti dari store)
function getUserRole() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role || null;
}

// Cek apakah user punya role tertentu
export function hasRole(allowedRoles = []) {
  const role = getUserRole();

  if (!role) return false;

  return allowedRoles.includes(role);
}

// Cek apakah user admin
export function isAdmin() {
  return hasRole(["admin"]);
}

// Cek apakah user staff
export function isStaff() {
  return hasRole(["staff"]);
}

// Cek apakah user boleh akses fitur tertentu (flexible)
export function canAccess(permissionRoles) {
  return hasRole(permissionRoles);
}
