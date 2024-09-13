from rest_framework import permissions

# perms_map = {
#         'GET': [],
#         'OPTIONS': [],
#         'HEAD': [],
#         'POST': ['%(app_label)s.add_%(model_name)s'],
#         'PUT': ['%(app_label)s.change_%(model_name)s'],
#         'PATCH': ['%(app_label)s.change_%(model_name)s'],
#         'DELETE': ['%(app_label)s.delete_%(model_name)s'],
#     }

class IsStaffEditorPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        print(user.get_all_permissions())

        # Check if user is staff
        if user.is_staff:
            # Allow GET and HEAD requests if user has view permission
            if request.method in permissions.SAFE_METHODS:
                return user.has_perm('products.view_product')

            # Allow POST, PUT, PATCH, DELETE if user has respective permissions
            if request.method == 'POST':
                return user.has_perm('products.add_product')
            elif request.method in ['PUT', 'PATCH']:
                return user.has_perm('products.change_product')
            elif request.method == 'DELETE':
                return user.has_perm('products.delete_product')

        return False
