export interface User {
    firebaseId?: string,
    name: string,
    email: string,
    sector: string,
    role: string,
    healthPlan?: string,
    dentalPlan?: string,
}
