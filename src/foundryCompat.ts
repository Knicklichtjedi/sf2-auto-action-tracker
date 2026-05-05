export function getActiveGM(): any | undefined {
    const users = game.users as any;
    return users?.activeGM ?? users?.find?.((u: any) => u.active && u.isGM);
}

export function isCurrentUserActiveGM(): boolean {
    const user = game.user as any;
    if (!user?.isGM) return false;
    if (typeof user.isActiveGM === "boolean") return user.isActiveGM;

    const activeGM = getActiveGM();
    return activeGM ? activeGM.id === user.id : true;
}

export function getOpenApplications(): any[] {
    const legacyWindows = Object.values((ui as any).windows ?? {});
    const ApplicationV2 = (foundry.applications as any)?.api?.ApplicationV2;
    const appV2Instances = ApplicationV2?.instances;
    const modernWindows = typeof appV2Instances === "function" ? Array.from(appV2Instances.call(ApplicationV2)) : [];

    return [...legacyWindows, ...modernWindows];
}

export function getCombatants(combat?: any): any[] {
    const combatants = combat?.combatants;
    if (!combatants) return [];
    if (Array.isArray(combatants)) return combatants;
    if (Array.isArray(combatants.contents)) return combatants.contents;
    if (typeof combatants.toObject === "function") return combatants.toObject();
    return Array.from(combatants);
}

export function loadHandlebarsTemplates(paths: string[]): Promise<unknown> | unknown {
    const appHandlebars = (foundry.applications as any)?.handlebars;
    if (typeof appHandlebars?.loadTemplates === "function") return appHandlebars.loadTemplates(paths);
    if (typeof (globalThis as any).loadTemplates === "function") return (globalThis as any).loadTemplates(paths);
}

export function renderHandlebarsTemplate(path: string, data: Record<string, unknown>): Promise<string> {
    const appHandlebars = (foundry.applications as any)?.handlebars;
    if (typeof appHandlebars?.renderTemplate === "function") return appHandlebars.renderTemplate(path, data);
    return (globalThis as any).renderTemplate(path, data);
}
