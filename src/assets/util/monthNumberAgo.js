export function monthNumberAgo(month) {
    //console.log("~ monthNumberAgo(3)", monthNumberAgo(3))
    const today = new Date();
    const threeMonthAgo = new Date(
      today.getFullYear(),
      today.getMonth() - month,
      today.getDate()
    )
      .toISOString()
      .split("T")[0];
  
    return threeMonthAgo;
  }

    
    

  