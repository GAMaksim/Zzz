import Realm from 'realm';

// ==========================================
// Realm Schemas
// ==========================================

class UserSettings extends Realm.Object<UserSettings> {
    id!: string;
    isPremium!: boolean;
    onboardingCompleted!: boolean;
    language!: string;
    selectedSound!: string | null;
    trialStartDate!: Date | null;
    installDate!: Date;

    static schema: Realm.ObjectSchema = {
        name: 'UserSettings',
        primaryKey: 'id',
        properties: {
            id: 'string',
            isPremium: { type: 'bool', default: false },
            onboardingCompleted: { type: 'bool', default: false },
            language: { type: 'string', default: 'en' },
            selectedSound: 'string?',
            trialStartDate: 'date?',
            installDate: { type: 'date', default: new Date() },
        },
    };
}

class SleepSchedule extends Realm.Object<SleepSchedule> {
    id!: string;
    dayOfWeek!: number;
    plannedBedtime!: string;
    isEnabled!: boolean;

    static schema: Realm.ObjectSchema = {
        name: 'SleepSchedule',
        primaryKey: 'id',
        properties: {
            id: 'string',
            dayOfWeek: 'int', // 0 = Sunday, 6 = Saturday
            plannedBedtime: { type: 'string', default: '22:30' },
            isEnabled: { type: 'bool', default: true },
        },
    };
}

class SleepRecord extends Realm.Object<SleepRecord> {
    id!: string;
    date!: Date;
    plannedBedtime!: string;
    actualBedtime!: string | null;
    wentToBedOnTime!: boolean;
    quality!: number | null;

    static schema: Realm.ObjectSchema = {
        name: 'SleepRecord',
        primaryKey: 'id',
        properties: {
            id: 'string',
            date: 'date',
            plannedBedtime: 'string',
            actualBedtime: 'string?',
            wentToBedOnTime: { type: 'bool', default: false },
            quality: 'int?',
        },
    };
}

// ==========================================
// Database Initialization
// ==========================================

let realmInstance: Realm | null = null;

export async function initDatabase(): Promise<Realm> {
    if (realmInstance) {
        return realmInstance;
    }

    realmInstance = await Realm.open({
        schema: [UserSettings, SleepSchedule, SleepRecord],
        schemaVersion: 1,
    });

    // Create default UserSettings if none exists
    const settings = realmInstance.objects<UserSettings>('UserSettings');
    if (settings.length === 0) {
        realmInstance.write(() => {
            realmInstance!.create('UserSettings', {
                id: 'default',
                isPremium: false,
                onboardingCompleted: false,
                language: 'en',
                selectedSound: null,
                trialStartDate: null,
                installDate: new Date(),
            });
        });
    }

    // Create 7 SleepSchedule entries (one per day) if none exist
    const schedules = realmInstance.objects<SleepSchedule>('SleepSchedule');
    if (schedules.length === 0) {
        realmInstance.write(() => {
            for (let day = 0; day < 7; day++) {
                realmInstance!.create('SleepSchedule', {
                    id: `schedule_${day}`,
                    dayOfWeek: day,
                    plannedBedtime: '22:30',
                    isEnabled: true,
                });
            }
        });
    }

    return realmInstance;
}

export function getRealm(): Realm {
    if (!realmInstance) {
        throw new Error('Database not initialized. Call initDatabase() first.');
    }
    return realmInstance;
}

// ==========================================
// CRUD — UserSettings
// ==========================================

export function getUserSettings(): UserSettings | null {
    const realm = getRealm();
    return realm.objectForPrimaryKey<UserSettings>('UserSettings', 'default');
}

export function updateUserSettings(
    updates: Partial<Omit<UserSettings, 'id' | 'installDate'>>,
): void {
    const realm = getRealm();
    realm.write(() => {
        const settings = getUserSettings();
        if (settings) {
            Object.assign(settings, updates);
        }
    });
}

// ==========================================
// CRUD — SleepSchedule
// ==========================================

export function getSleepSchedules(): Realm.Results<SleepSchedule> {
    const realm = getRealm();
    return realm
        .objects<SleepSchedule>('SleepSchedule')
        .sorted('dayOfWeek');
}

export function getScheduleForDay(
    dayOfWeek: number,
): SleepSchedule | null {
    const realm = getRealm();
    return realm.objectForPrimaryKey<SleepSchedule>(
        'SleepSchedule',
        `schedule_${dayOfWeek}`,
    );
}

export function updateScheduleForDay(
    dayOfWeek: number,
    updates: { plannedBedtime?: string; isEnabled?: boolean },
): void {
    const realm = getRealm();
    realm.write(() => {
        const schedule = getScheduleForDay(dayOfWeek);
        if (schedule) {
            Object.assign(schedule, updates);
        }
    });
}

// ==========================================
// CRUD — SleepRecord
// ==========================================

export function getSleepRecords(_limit?: number): Realm.Results<SleepRecord> {
    const realm = getRealm();
    const records = realm
        .objects<SleepRecord>('SleepRecord')
        .sorted('date', true); // newest first
    // Note: Realm doesn't have a native limit, use .slice() when consuming
    return records;
}

export function recordBedtime(
    plannedBedtime: string,
    actualBedtime: string,
    onTime: boolean,
): void {
    const realm = getRealm();
    const id = `record_${Date.now()}`;

    realm.write(() => {
        realm.create('SleepRecord', {
            id,
            date: new Date(),
            plannedBedtime,
            actualBedtime,
            wentToBedOnTime: onTime,
            quality: null,
        });
    });
}

export function closeDatabase(): void {
    if (realmInstance && !realmInstance.isClosed) {
        realmInstance.close();
        realmInstance = null;
    }
}
