# dnsmasq-expert method

Identify whether dnsmasq is DNS-only, DHCP, PXE/TFTP, local authoritative, or NetworkManager/libvirt-managed. Validate syntax using `dnsmasq --test`; inspect ports 53/67/547; verify upstream resolvers and avoid forwarding loops.
