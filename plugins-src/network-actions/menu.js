export default {
    "caption": "Network",
    "type": "CONTAINER",
    "children": [
        {
            "description": "Ping selected Host",
            "caption": "Ping",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
                "start \"ping -t #{hostname}\" ping -t #{hostname}"
            ]
        },
        {
            "description": "Ping selected Host",
            "caption": "Ping",
            "shell": "bash",
            "type": "COMMAND",
            "platform": "linux",
            "commands": [
                "xterm -e \"ping #{hostname}\""
            ]
        },
        {
            "description": "DNS Name resolution",
            "caption": "Nslookup",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
                "start \"\" nslookup #{hostname}"
            ]
        },
        {
            "description": "DNS Name resolution",
            "caption": "Traceroute",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
                "start \"\" tracert -4 -d #{hostname}"
            ]
        }
    ]
}