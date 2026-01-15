
type IRandomData = {
    "email": string,
    "password": string,
    token?: string,
    server?: string,
    ip?: string
}

const randomIps: string[] = [
    "192.168.1.101",
    "172.16.0.5",
]

const urlaSignup: string[] = [
    "http://localhost:4001/auth/signup",
    "http://localhost:4002/auth/signup",
    "http://localhost:4003/auth/signup",
]

const urlsLogin: string[] = [
    "http://localhost:4001/auth/login",
    "http://localhost:4002/auth/login",
    "http://localhost:4003/auth/login",
]

const randomData: IRandomData[] = [
    { "email": "skywalker23@email.com", "password": "skywalker23abc123" },
    { "email": "skywalker23@email.comn", "password": "skywalker23abc123" },
    { "email": "pixel_panda@email.comn", "password": "pixel_pandaabc123" },
    { "email": "nova_rider@email.comn", "password": "nova_riderabc123" },
    { "email": "echo_blaze@email.comn", "password": "echo_blazeabc123" },
    { "email": "frostbyte7@email.comn", "password": "frostbyte7abc123" },
    { "email": "luna_coder@email.comn", "password": "luna_coderabc123" },
    { "email": "byte_bandit@email.comn", "password": "byte_banditabc123" },
    { "email": "zenith_wave@email.comn", "password": "zenith_waveabc123" },
    { "email": "cyber_owl@email.comn", "password": "cyber_owlabc123" },
    { "email": "astro_knight@email.comn", "password": "astro_knightabc123" },
    { "email": "shadow_mint@email.comn", "password": "shadow_mintabc123" },
    { "email": "neon_nimbus@email.comn", "password": "neon_nimbusabc123" },
    { "email": "quasar_fox@email.comn", "password": "quasar_foxabc123" },
    { "email": "glitchy_gem@email.comn", "password": "glitchy_gemabc123" },
    { "email": "orbitronix@email.comn", "password": "orbitronixabc123" },
    { "email": "matrix_muse@email.comn", "password": "matrix_museabc123" },
    { "email": "blitz_bard@email.comn", "password": "blitz_bardabc123" },
    { "email": "vortex_vibe@email.comn", "password": "vortex_vibeabc123" },
    { "email": "stellar_sage@email.comn", "password": "stellar_sageabc123" },
    { "email": "quantum_quill@email.comn", "password": "quantum_quillabc123" }
];

export const signUp = async (randomData: IRandomData): Promise<IRandomData> => {

    const randomIP = randomIps[Math.floor(Math.random() * randomIps.length)];
    const randomServer = urlaSignup[Math.floor(Math.random() * urlaSignup.length)];

    const response = await fetch(randomServer, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Forwarded-For": randomIP
        },
        body: JSON.stringify(randomData)
    });

    randomData.server = randomServer;
    randomData.ip = randomIP;
    randomData.token = await response.json();

    return randomData;
}

(
    async () => {
        const signUpRes = await Promise.all(
            randomData.map(async (data) => await signUp(data))
        )
        console.log(`signUpRes: `, signUpRes);
    }
)()