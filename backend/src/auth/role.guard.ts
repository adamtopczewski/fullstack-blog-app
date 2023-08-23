import { CanActivate, ExecutionContext, Type, mixin } from "@nestjs/common";
import Role from "src/users/role.enum";
import JwtAuthenticationGuard from "./jwtAuthentication.guard";
import RequestWithUser from "./requestWithUser.interface";

const RoleGuard = (role: Role) : Type<CanActivate> => {
    class RoleGuardMixin extends JwtAuthenticationGuard {
        async canActivate(context: ExecutionContext) {
            await super.canActivate(context);

            const request = context.switchToHttp().getRequest<RequestWithUser>();
            const user = request.user;

            return user?.roles.includes(role);
        }
    }
    return mixin(RoleGuardMixin);
}

export default RoleGuard;