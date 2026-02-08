import { auth } from '@clerk/nextjs/server';

export type Role = 'admin' | 'auditor' | 'client';

export interface RBACContext {
    userId: string;
    orgId: string;
    role: Role;
}

/**
 * Get current user's RBAC context from Clerk
 * Role is determined from organization membership
 */
export async function getRBACContext(): Promise<RBACContext | null> {
    const { userId, orgId, orgRole } = await auth();

    if (!userId || !orgId) {
        return null;
    }

    // Map Clerk org roles to our application roles
    // Customize this based on your Clerk organization role configuration
    let role: Role = 'client'; // Default to most restrictive

    if (orgRole === 'org:admin') {
        role = 'admin';
    } else if (orgRole === 'org:auditor') {
        role = 'auditor';
    }

    return {
        userId,
        orgId,
        role,
    };
}

/**
 * Check if user has specific role
 */
export function hasRole(context: RBACContext, requiredRole: Role): boolean {
    const roleHierarchy: Record<Role, number> = {
        'admin': 3,
        'auditor': 2,
        'client': 1,
    };

    return roleHierarchy[context.role] >= roleHierarchy[requiredRole];
}

/**
 * Check if user can perform action on resource
 */
export function canAccessResource(
    context: RBACContext,
    resource: string,
    action: 'read' | 'write' | 'delete'
): boolean {
    // Admin can do everything
    if (context.role === 'admin') {
        return true;
    }

    // Auditor permissions
    if (context.role === 'auditor') {
        const readOnlyResources = ['dashboard', 'reports', 'policies', 'activity', 'incidents'];
        if (action === 'read' && readOnlyResources.includes(resource)) {
            return true;
        }
        // Auditors can write to incidents (add notes, assign)
        if (resource === 'incidents' && action === 'write') {
            return true;
        }
        return false;
    }

    // Client permissions (most restrictive)
    if (context.role === 'client') {
        return action === 'read' && resource === 'reports';
    }

    return false;
}

/**
 * Require specific role or throw error
 */
export async function requireRole(requiredRole: Role): Promise<RBACContext> {
    const context = await getRBACContext();

    if (!context) {
        throw new Error('Unauthorized: No authentication context');
    }

    if (!hasRole(context, requiredRole)) {
        throw new Error(`Unauthorized: Requires ${requiredRole} role`);
    }

    return context;
}

/**
 * Require access to resource or throw error
 */
export async function requireResourceAccess(
    resource: string,
    action: 'read' | 'write' | 'delete'
): Promise<RBACContext> {
    const context = await getRBACContext();

    if (!context) {
        throw new Error('Unauthorized: No authentication context');
    }

    if (!canAccessResource(context, resource, action)) {
        throw new Error(`Unauthorized: Cannot ${action} ${resource}`);
    }

    return context;
}
