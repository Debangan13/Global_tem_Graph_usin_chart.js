

const getData = async () => {
	const response = await fetch('ZonAnn.Ts+dSST.csv')
    const data = await response.text()
    const years = []
    const gtemps = []
	const NHem = []
	const SHem = []
    const rows = data.split('\n').slice(1)
    
    rows.forEach((row) => {
        const columns = row.split(",")
        years.push(columns[0])
        gtemps.push(14 +parseFloat(columns[1]))  
		NHem.push(14 +parseFloat(columns[2])) 
		SHem.push(14 +parseFloat(columns[3]))
    })
    return {years, gtemps, NHem, SHem}
}

const myChart = async () => {
    const data = await getData()
    // console.log(data.years,data.gtemps)
    const ctx = document.getElementById("myChart");
	new Chart(ctx, {
		type: "line",
		data: {
            labels: data.years,
			datasets: [
				{
                    label: "Global Temperature in °C",
					data:data.gtemps,
					backgroundColor: "rgba(255, 99, 132, 0.2)",
					borderColor: "rgba(255, 99, 132)",						
					borderWidth: 1,
				},
				{
					label: 'Northern Hemisphere Temperature in °C',
					data: data.NHem,
					borderColor: 'rgba(99, 132, 255, 1)',
					backgroundColor: 'rgba(99, 132, 255, 0.5)',
					borderWidth: 1
				  },
				{
					label: 'Souther Hemisphere in °C',
					data: data.SHem,
					borderColor: 'rgb(13, 164, 240)',
                backgroundColor: 'rgb(13, 164, 240)',
					borderWidth: 1
				  },
			],			
		},	
		options: {
			scales: {
				y: {
					ticks: {
						// Include a dollar sign in the ticks
						callback: function(value, index, ticks) {
							return value + '°';
						}
					}
				}
			}
		}	
	});
	
};
myChart()




// const s = "1881,-.09,-.18,.00,-.35,.10,-.07,-.90,-.43,-.24,.10,.11,-.05,-.07,.58"
// const t = s.split(/,-\.|,/)
// console.log(t)

