# Documentation

Comprehensive documentation untuk SkyHouse Property CMS.

## 📁 Directory Structure

```
docs/
├── deployment/        # Production deployment guides
├── development/       # Development guides
├── guides/           # How-to guides & references
└── archive/          # Implementation notes & historical docs
```

## 🚀 Deployment

**Location:** `docs/deployment/`

Production deployment guides untuk berbagai skenario.

- **[Deployment Overview](deployment/README.md)** - Decision tree & comparison
- **[Docker Deployment](deployment/docker-deployment.md)** - Full Docker stack (2GB+ RAM)
- **[Lightweight Deployment](deployment/lightweight-deployment.md)** - Resource-limited options
- **[VPS Setup Guide](deployment/vps-setup.md)** - Server setup from scratch

**Quick Links:**
- [Which deployment method should I use?](deployment/README.md#decision-tree)
- [Resource comparison](deployment/README.md#comparison-table)
- [Pre-deployment checklist](deployment/README.md#pre-deployment-checklist)

## 💻 Development

**Location:** `docs/development/`

Guides untuk development dan customization.

- **[Frontend Development Guide](development/FRONTEND-GUIDE.md)** - React, Tailwind, components

**Topics covered:**
- Component structure
- Styling with Tailwind CSS
- State management
- Form handling
- Image uploads

## 📚 Guides & References

**Location:** `docs/guides/`

How-to guides dan command references.

- **[Seeding Guide](guides/SEEDING-GUIDE.md)** - Database seeding & sample data
- **[Commands Reference](guides/COMMANDS.md)** - Available artisan commands

## 📦 Archive

**Location:** `docs/archive/`

Implementation notes dan historical documentation. Useful untuk reference tapi bukan primary docs.

- `ARTICLE_SYSTEM_IMPLEMENTATION.md` - Article system implementation notes
- `COMPLETE_ARTICLE_SYSTEM.md` - Complete article feature documentation
- `WYSIWYG_IMPLEMENTATION_COMPLETE.md` - Rich text editor implementation
- `HIDDEN_REGISTRATION.md` - Hidden admin registration feature

## 🔍 Quick Find

### I want to...

**Deploy to production**
- → See [Deployment Overview](deployment/README.md)
- → Use [Docker Deployment](deployment/docker-deployment.md) if you have 2GB+ RAM
- → Use [Lightweight Deployment](deployment/lightweight-deployment.md) if resource-limited

**Develop locally**
- → Check [README.md](../README.md#quick-start) for quick start
- → See [Frontend Guide](development/FRONTEND-GUIDE.md) for component development

**Seed database**
- → Follow [Seeding Guide](guides/SEEDING-GUIDE.md)

**Run artisan commands**
- → Check [Commands Reference](guides/COMMANDS.md)

**Setup VPS from scratch**
- → Follow [VPS Setup Guide](deployment/vps-setup.md)

**Optimize existing Docker**
- → See [Lightweight Deployment - Option 0](deployment/lightweight-deployment.md#option-0-optimize-existing-docker-setup)

## 📖 Related Resources

- [Scripts Directory](../scripts/) - Automation scripts
- [Project README](../README.md) - Project overview
- [Deployment Scripts](../scripts/deployment/) - Deployment automation
- [Server Setup Scripts](../scripts/server-setup/) - Server configuration

## 🆘 Need Help?

If documentation tidak menjawab pertanyaan Anda:

1. Check [Archive](archive/) untuk implementation notes
2. Search di documentation menggunakan grep:
   ```bash
   grep -r "search term" docs/
   ```
3. Review script source code di `scripts/`
4. Open an issue on GitHub

## 📝 Contributing to Docs

Jika menemukan error atau ingin improve documentation:

1. Edit file markdown yang relevan
2. Keep formatting consistent
3. Update table of contents jika menambah section baru
4. Test all code examples
5. Submit pull request

---

**Last Updated:** 2025-01-26
