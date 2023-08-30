export const UseConverDate = (inputDate: string) => {
  //convert date time
  const date = inputDate;
  const newDate = new Date(date);

  const daysIndonesia: Array<string> = ["Minggu", "senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const monthIndonesia: Array<string> = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const dayName = daysIndonesia[newDate.getDay()];
  const dateName = newDate.getDate();
  const monthName = monthIndonesia[newDate.getMonth()];
  const yearName = newDate.getFullYear();

  const result = `${dayName}, ${dateName} ${monthName} ${yearName}`;

  return result;
};
