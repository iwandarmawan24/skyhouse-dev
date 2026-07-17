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

**Current production method:** bare-metal nginx + PHP-FPM. See **[../DEPLOYMENT.md](../DEPLOYMENT.md)** — domain setup, deploy/update flow, troubleshooting.

**Location:** `docs/deployment/` (⚠️ mostly historical — Docker-based, superseded)

- **[Deployment Overview](deployment/README.md)** - old decision tree & comparison (Docker-focused)
- **[Docker Deployment](deployment/docker-deployment.md)** - deprecated, kept for reference
- **[Lightweight Deployment](deployment/lightweight-deployment.md)** - Option 1 (Traditional LEMP) still relevant, Docker options deprecated
- **[VPS Setup Guide](deployment/vps-setup.md)** - initial server setup (Docker step deprecated)
- **[Fix 404 Error](deployment/FIX-404.md)** - production 404 troubleshooting
- **[Production Re-Deployment Guide](deployment/PRODUCTION-REDEPLOYMENT-GUIDE.md)** - full redeploy from scratch

## 💻 Development

**Location:** `docs/development/`

Guides untuk development dan customization.

- **[Local Setup Guide](development/LOCAL-SETUP.md)** - Docker Sail vs Manual setup
- **[Frontend Development Guide](development/FRONTEND-GUIDE.md)** - React, Tailwind, components

**Topics covered:**
- Local environment setup (Docker Sail / Manual)
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
- **[WhatsApp Sharing](guides/WHATSAPP_SHARING.md)** - Open Graph tags untuk share thumbnail
- **[Media Library Guide](guides/MEDIA_LIBRARY_GUIDE.md)** - WordPress-like media management usage
- **[Sitemap Implementation](guides/SITEMAP_IMPLEMENTATION.md)** - XML sitemap via spatie/laravel-sitemap
- **[Security](guides/SECURITY.md)** - Data security features (API resources, dll)
- **[Database Migration Guide](guides/database-migration-guide.md)** - Perubahan database tanpa kehilangan data

## 📦 Archive

**Location:** `docs/archive/`

Implementation notes dan historical documentation. Useful untuk reference tapi bukan primary docs.

- `ARTICLE_SYSTEM_IMPLEMENTATION.md` - Article system implementation notes
- `COMPLETE_ARTICLE_SYSTEM.md` - Complete article feature documentation
- `WYSIWYG_IMPLEMENTATION_COMPLETE.md` - Rich text editor implementation
- `HIDDEN_REGISTRATION.md` - Hidden admin registration feature
- `TOAST_MIGRATION_GUIDE.md` - Sonner toast migration notes
- `REORGANIZATION.md` - Docs/scripts reorganization notes (2025-01-26)
- `MEDIA_LIBRARY_IMPLEMENTATION_SUMMARY.md` - Media library build notes (completed)
- `PRODUCT_FORM_MEDIA_INTEGRATION.md` - MediaPicker integration example (now live across all admin forms)
- `SEO_CALCULATOR_REVAMP.md` - SEO calculator revamp notes (December 2025, completed)

## 🔍 Quick Find

### I want to...

**Setup local development**
- → See [Local Setup Guide](development/LOCAL-SETUP.md) - Docker Sail or Manual setup
- → Quick start in [README.md](../README.md#quick-start)

**Deploy to production**
- → See [Deployment Overview](deployment/README.md)
- → Use [Docker Deployment](deployment/docker-deployment.md) if you have 2GB+ RAM
- → Use [Lightweight Deployment](deployment/lightweight-deployment.md) if resource-limited

**Develop React components**
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

**Last Updated:** 2026-07-17
