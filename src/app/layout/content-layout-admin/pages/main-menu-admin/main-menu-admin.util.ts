import { animate, style, transition, trigger } from '@angular/animations';

export interface NavbarData {
  routeLink?: string | '';
  icon?: string;
  label?: string;
  labelar?: string;
  expanded?: boolean;
  id?: string;
  idhash?: string;
  char?: string;
  items?: NavbarData[];
}

export const navbarData: NavbarData[] = [

  {
    label: 'Drivers',
    labelar: 'السائقين',
    id: 'Drivers',
    icon: 'receipt_long',
    routeLink: "drivers"
  },
  {
    label: 'Payments',
    labelar: 'الدفعات',
    id: 'Payments',
    icon: 'receipt_long',
    routeLink: "payments"
  },
  {
    label: 'Monthly Payments',
    labelar: 'الدفعات الشهريه',
    id: 'Months',
    icon: 'receipt_long',
    routeLink: "months"
  },
  {
    label: 'Expired Licence Report',
    labelar: 'تقرير الرخص المنتهية',
    id: 'ExpiredLicence',
    icon: 'receipt_long',
    routeLink: "expiredLicenceReport"
  },


];
