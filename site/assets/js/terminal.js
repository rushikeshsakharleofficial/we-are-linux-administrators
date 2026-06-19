/* Terminal Portfolio — Vanilla JS */

class TerminalPortfolio {
  constructor() {
    this.history = [];
    this.historyIndex = -1;
    this.currentCommand = '';

    this.outputEl = document.getElementById('terminal-output');
    this.inputEl = document.getElementById('terminal-input');

    this.commands = {
      'help': () => this.getHelp(),
      'about': () => this.getAbout(),
      'projects': () => this.getProjects(),
      'skills': () => this.getSkills(),
      'experience': () => this.getExperience(),
      'education': () => this.getEducation(),
      'contact': () => this.getContact(),
      'clear': () => this.clear(),
    };

    this.init();
  }

  init() {
    this.inputEl.addEventListener('keydown', (e) => this.handleKeyDown(e));
    this.inputEl.addEventListener('change', () => {
      this.currentCommand = this.inputEl.value;
    });
    this.inputEl.addEventListener('input', () => {
      this.currentCommand = this.inputEl.value;
    });

    document.addEventListener('click', () => {
      this.inputEl.focus();
    });

    // Initial welcome message
    this.addOutput('/welcome', this.getWelcome());
    this.inputEl.focus();
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.executeCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.historyIndex = Math.min(this.historyIndex + 1, this.history.length - 1);
      if (this.history.length > 0) {
        this.inputEl.value = this.history[this.history.length - 1 - this.historyIndex];
        this.currentCommand = this.inputEl.value;
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.historyIndex = Math.max(this.historyIndex - 1, -1);
      this.inputEl.value = this.historyIndex === -1 ? '' : this.history[this.history.length - 1 - this.historyIndex];
      this.currentCommand = this.inputEl.value;
    }
  }

  executeCommand() {
    const cmd = this.inputEl.value.trim().toLowerCase();
    const fn = this.commands[cmd];
    const output = fn ? fn() : `Command not found: ${cmd}\nType help to see available commands.`;

    if (cmd !== 'clear') {
      this.addOutput(this.inputEl.value, output);
      this.history.push(this.inputEl.value);
    }

    this.inputEl.value = '';
    this.currentCommand = '';
    this.historyIndex = -1;
  }

  addOutput(command, output) {
    const entry = document.createElement('div');
    entry.className = 'terminal-entry';

    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-command';
    cmdLine.innerHTML = `<span class="terminal-prompt">admin@portfolio:~$</span> <span class="terminal-cmd-text">${this.escapeHtml(command)}</span>`;

    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-output-text';
    outputLine.innerHTML = this.renderOutput(output);

    entry.appendChild(cmdLine);
    entry.appendChild(outputLine);
    this.outputEl.appendChild(entry);

    // Auto scroll
    this.outputEl.parentElement.scrollTop = this.outputEl.parentElement.scrollHeight;
  }

  renderOutput(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

    let html = this.escapeHtml(text);

    // Links
    html = html.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener" class="terminal-link">$1</a>');

    // Emails
    html = html.replace(emailRegex, '<a href="mailto:$1" class="terminal-link">$1</a>');

    // Line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  clear() {
    this.outputEl.innerHTML = '';
    return '';
  }

  getWelcome() {
    return `
████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     ██╗  ██╗   ██╗
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     ██║  ╚██╗ ██╔╝
   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     ██║   ╚████╔╝
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     ██║    ╚██╔╝
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗███████╗██║
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝

[SYSTEM INITIALIZED] - Terminal Portfolio v1.0

Welcome to the interactive terminal. Type help to see available commands.`;
  }

  getHelp() {
    return `[AVAILABLE_COMMANDS]

about       Display personal information
projects    View project portfolio
skills      Show technical skills
experience  Display work history
education   View educational background
contact     Show contact information
clear       Clear terminal screen
help        Display this help message`;
  }

  getAbout() {
    return `Name: Linux Administrator
Role: Senior SRE & Systems Engineer
Location: Global
Status: Available

Bio: Passionate systems engineer with deep expertise in Linux infrastructure,
cloud platforms, and automation. Specialized in designing scalable, reliable,
and secure systems. Open to interesting challenges and collaborations.`;
  }

  getProjects() {
    return `[PROJECT PORTFOLIO]

1. Linux Kernel Debugging Framework
   • Tech Stack: C, Python, GDB, SystemTap
   • Features: Automated root cause analysis, performance profiling
   • Impact: Reduced debug time by 70% in production incidents

2. Infrastructure-as-Code Platform
   • Tech Stack: Terraform, Ansible, Go, Kubernetes
   • Features: Multi-cloud deployments, GitOps workflows
   • Users: 50+ organizations managing 10k+ servers

3. Real-time Log Analysis Engine
   • Tech Stack: Rust, Kafka, ClickHouse
   • Features: Pattern detection, anomaly alerts
   • Performance: <10ms latency at 1M events/sec

4. Container Security Scanner
   • Tech Stack: Go, OCI spec, Linux capabilities
   • Features: Vulnerability detection, policy enforcement
   • Adoption: 500+ deployments`;
  }

  getSkills() {
    return `[TECHNICAL SKILLS MATRIX]

Linux & Kernel:
  Linux Internals        ████████████████████ 100%
  Kernel Debugging       ██████████████████   90%
  Performance Tuning     ██████████████████   90%
  Boot & Initramfs       ████████████████     80%

Cloud & Container:
  Kubernetes             ████████████████████ 100%
  Docker/Podman          ████████████████████ 100%
  AWS/GCP/Azure          ██████████████████   90%
  Infrastructure Code    ████████████████████ 100%

Automation:
  Terraform              ████████████████████ 100%
  Ansible                ████████████████████ 100%
  Bash/Python/Go         ████████████████████ 100%

Storage & Networking:
  LVM/ZFS/Btrfs         ██████████████████   90%
  Networking Stack      ██████████████████   90%
  Load Balancing        ████████████████     80%`;
  }

  getExperience() {
    return `[WORK EXPERIENCE]

2023 - Present | Principal SRE Engineer
CloudScale Inc, Remote
• Led infrastructure modernization serving 10M+ users
• Designed multi-region HA architecture reducing latency by 40%
• Mentored team of 8 engineers on SRE best practices
• Technologies: Kubernetes, Terraform, Go, Rust

2021 - 2023 | Senior Linux Systems Engineer
DevOps Solutions, San Francisco, CA
• Architected Linux-based CI/CD platform
• Automated 500+ server deployments
• Reduced incident response time from 2hrs to 15min
• Technologies: Ansible, Linux, Python, Prometheus

2018 - 2021 | Systems Administrator
TechCorp, Los Angeles, CA
• Managed 1000+ Linux servers across data centers
• Implemented monitoring and alerting system
• Improved system uptime to 99.99%
• Technologies: Bash, Nagios, OpenStack`;
  }

  getEducation() {
    return `[EDUCATION & CERTIFICATIONS]

Master of Science in Computer Science
University of Washington, Seattle (2014-2016)
• Specialization: Systems & Distributed Computing
• GPA: 3.9/4.0

Bachelor of Science in Systems Engineering
MIT, Cambridge (2010-2014)
• Graduated Cum Laude
• Relevant: Kernel Design, Network Protocols

Certifications:
• Linux Foundation Certified System Administrator (LFCS)
• Kubernetes Application Developer (CKAD)
• AWS Solutions Architect Professional (2023)
• Certified Kubernetes Administrator (CKA)

Continuous Learning:
• Active kernel contributor
• Regular speaker at conferences
• Published papers on system optimization`;
  }

  getContact() {
    return `[CONTACT INFORMATION]

📧 Email: admin@linuxsystems.dev
🐙 GitHub: https://github.com/linuxadmin
💼 LinkedIn: https://linkedin.com/in/linuxadmin
🌐 Portfolio: https://linuxsystems.dev
📱 Matrix: @admin:matrix.org
📍 Timezone: UTC-8

Available for: Consulting, speaking engagements, open-source collaboration

Response Time: Within 24 hours
Best Contact: Email or GitHub Issues`;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TerminalPortfolio();
});
