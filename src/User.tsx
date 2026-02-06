export function user() {
  const GetUser = () => {
    let id = localStorage.getItem("user_id");
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("user_id", id);
      }
      return String(id);
  }
  const user_ID : string = GetUser();
    

  const UpdateMoney = async (Money : number) => {
    const response = await fetch("https://hroudfi22.sps-prosek.cz/maty/scoreBoard.php", {
      method: "POST",
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({score: Money, user_id: user_ID, status: "update"})
    });
    await response.json();
  }

  const GetMoney = async (setMoney : Function) => {
    const response = await fetch("https://hroudfi22.sps-prosek.cz/maty/scoreBoard.php", {
      method: "POST",
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({user_id: user_ID, status: "get"})
    });
    const data = await response.json();
    setMoney(data["points"]);
  }

  return {
    GetMoney,
    UpdateMoney,
  };
}