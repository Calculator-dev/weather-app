// eslint-disable-next-line
export default async location => {
    try {
        const result = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${location},&APPID=7326426673aa564426ca637f641ab2ce&units=metric`,
        );

        if (result.status === 200) {
            return { success: true, data: await result.json() }
        }

        return { success: false, error: result.statusText }
    } catch (ex) {
        return { success: false, error: ex.message }
    }
}