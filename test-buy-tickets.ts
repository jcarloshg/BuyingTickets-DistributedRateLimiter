import { writeFileSync } from "fs";

type IRandomData = {
    email: string;
    password: string;
    // flag for the tests results
    buyTime?: string;
    buyResponse?: string;
    server?: string;
    ownIp?: string;
    token?: string;
};

const getRandomIP = (): string => {
    const octet1 = Math.floor(Math.random() * 256);
    const octet2 = Math.floor(Math.random() * 256);
    const octet3 = Math.floor(Math.random() * 256);
    const octet4 = Math.floor(Math.random() * 256);
    return `${octet1}.${octet2}.${octet3}.${octet4}`;
};

const servers: string[] = [
    "http://localhost:4001",
    "http://localhost:4002",
    "http://localhost:4003",
];

const randomData: IRandomData[] = [
    { email: "skywalker23@email.com", password: "skywalker23abc123" },
    { email: "skywalker23@email.comn", password: "skywalker23abc123" },
    { email: "pixel_panda@email.comn", password: "pixel_pandaabc123" },
    { email: "nova_rider@email.comn", password: "nova_riderabc123" },
    { email: "echo_blaze@email.comn", password: "echo_blazeabc123" },
    { email: "frostbyte7@email.comn", password: "frostbyte7abc123" },
    { email: "luna_coder@email.comn", password: "luna_coderabc123" },
    { email: "byte_bandit@email.comn", password: "byte_banditabc123" },
    { email: "zenith_wave@email.comn", password: "zenith_waveabc123" },
    { email: "cyber_owl@email.comn", password: "cyber_owlabc123" },
    { email: "astro_knight@email.comn", password: "astro_knightabc123" },
    { email: "shadow_mint@email.comn", password: "shadow_mintabc123" },
    { email: "neon_nimbus@email.comn", password: "neon_nimbusabc123" },
    { email: "quasar_fox@email.comn", password: "quasar_foxabc123" },
    { email: "glitchy_gem@email.comn", password: "glitchy_gemabc123" },
    { email: "orbitronix@email.comn", password: "orbitronixabc123" },
    { email: "matrix_muse@email.comn", password: "matrix_museabc123" },
    { email: "blitz_bard@email.comn", password: "blitz_bardabc123" },
    { email: "vortex_vibe@email.comn", password: "vortex_vibeabc123" },
    { email: "stellar_sage@email.comn", password: "stellar_sageabc123" },
    { email: "quantum_quill@email.comn", password: "quantum_quillabc123" },
];

export const signUp = async (randomData: IRandomData): Promise<IRandomData> => {
    const randomIP = getRandomIP();
    // const randomIP = randomIps[Math.floor(Math.random() * randomIps.length)];
    const randomServer = servers[Math.floor(Math.random() * servers.length)];
    const completeURL = `${randomServer}/auth/signup`;

    try {
        const response = await fetch(completeURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-SIMULATE-IP": randomIP,
            },
            body: JSON.stringify(randomData),
        });

        randomData.server = randomServer;
        randomData.ownIp = randomIP;
        return randomData;
    } catch (error) {
        return randomData;
    }
};

const login = async (randomData: IRandomData): Promise<IRandomData> => {
    try {
        const server = randomData.server!;
        const completeURL = `${server}/auth/login`;
        const response = await fetch(completeURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-SIMULATE-IP": randomData.ownIp!,
            },
            body: JSON.stringify({
                email: randomData.email,
                password: randomData.password,
            }),
            cache: "no-store",
        });

        const resJson = (await response.json()) as any;

        if (resJson.accessToken) {
            randomData.token = resJson.accessToken;
        }

        return randomData;
    } catch (error) {
        console.log(`error: `, error);
        return randomData;
    }
};

const buyTicketsResults = []
const buyTickets = async (randomData: IRandomData, intents: number) => {
    try {

        const server = randomData.server!;
        const completeURL = `${server}/ticket/pay-ticket`;

        await Promise.all(
            Array.from({ length: intents }).map(async () => {
                const randomUuid = crypto.randomUUID();
                const creditCard = "4111111111111111";
                const response = await fetch(completeURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${randomData.token}`,
                    },
                    body: JSON.stringify({
                        ticketUuids: [randomUuid],
                        creditCard: creditCard,
                    }),
                    cache: "no-store",
                });
                const resJson = (await response.json()) as any;
                console.log(`resJson: `, resJson);


                randomData.buyTime = new Date().toISOString();
                randomData.buyResponse = "success";

                if (resJson.message) {
                    randomData.buyResponse = resJson.message || "No response message";
                }
                if (resJson.total) {
                    const str = JSON.stringify(resJson);
                    randomData.buyResponse = str;
                }

            })
        )


    } catch (error) {

    }
};

(async () => {
    // first sign up all users
    const signUpRes = await Promise.all(
        randomData.map(async (data) => await signUp(data))
    );

    // then login with random number of intents
    // const requestForLogin: IRandomData[] = [];
    // signUpRes.map((data) => {
    //     const randomIntents = Math.floor(Math.random() * 5) + 1; // between 1 and 5
    //     Array.from({ length: 10 }).forEach(() => requestForLogin.push({ ...data }));
    // });
    // console.log(`requestForLogin: `, requestForLogin);

    const loginRs = await Promise.all(
        signUpRes.map(async (data) => await login(data))
    );
    // console.log(`loginRs: `, loginRs);

    // then buy tickets with random number of intents
    for (const data of loginRs) {
        const randomIntents = Math.floor(Math.random() * 5) + 1; // between 1 and 5
        await buyTickets(data, randomIntents);
    }

    // finally write results to CSV
    const csvHeaders = [
        "email",
        "password",
        "buyTime",
        "buyResponse",
        "ownIp",
        "server",
        "token",
    ];

    const csvRows = loginRs.map((data) =>
        csvHeaders
            .map((header) => JSON.stringify(data[header as keyof IRandomData] ?? ""))
            .join(",")
    );

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");

    writeFileSync("buy-tickets-results.csv", csvContent);
    console.log("CSV file written: login-results.csv");
})();
