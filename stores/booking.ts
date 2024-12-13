export const useBookingStore = defineStore("booking", () => {
  const formatDate = (date: Date) => {
    const offsetToUTC8 = date.getHours() + 8;
    date.setHours(offsetToUTC8);
    return date.toISOString().split("T")[0];
  };

  // 預定日期
  const currentDate = new Date();
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  const bookingDate = ref({
    date: {
      start: formatDate(currentDate),
      end: formatDate(tomorrow),
    },
    minDate: new Date(),
    maxDate: new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)),
  });
  // 預定天數
  const daysCount = ref(1);
  // 預定人數
  const bookingPeople = ref(1);

  // const sessionData = useSessionStorage("bookingData", {
  //   startDate: "",
  //   endDate: "",
  //   daysCount: 1,
  // });

  // const setStartDate = (date: string) => {
  //   sessionData.value.startDate = date;
  // };

  // const setEndDate = (date: string) => {
  //   sessionData.value.endDate = date;
  // };

  // const setDaysCount = (date: number) => {
  //   sessionData.value.daysCount = date;
  // };

  return {
    bookingDate,
    bookingPeople,
    daysCount,
    // sessionData,
    // setStartDate,
    // setEndDate,
    // setDaysCount,
  };
});
