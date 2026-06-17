# Cross-skill routing

Use this routing map after the addon pack lands.

- backup-restore-expert -> mysql-expert, lvm-expert, filesystem-expert
- logrotate-expert -> rsyslog-expert, nginx-expert, php-fpm-expert
- auditd-expert -> incident-response-expert, ssh-hardening-expert
- rsyslog-expert -> logrotate-expert, incident-response-expert
- ssh-hardening-expert -> sudoers-expert, pam-expert, firewall-expert
- lvm-expert -> backup-restore-expert, filesystem-expert
- tcpdump-expert -> network, firewall-expert, tcp-expert, udp-expert
- incident-response-expert -> grep-expert, auditd-expert, rsyslog-expert, backup-restore-expert
- nginx-expert -> php-fpm-expert, tcpdump-expert
- php-fpm-expert -> nginx-expert, memory-expert
- mysql-expert -> backup-restore-expert, memory-expert, storage
