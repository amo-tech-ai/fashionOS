# FashionOS Kiro Steering Files

This directory contains steering files that provide consistent context and guidance for Kiro IDE during development of the FashionOS platform.

## Table of Contents

1. [What are Steering Files?](#what-are-steering-files)
2. [File Overview](#file-overview)
3. [How Steering Works](#how-steering-works)
4. [Inclusion Modes](#inclusion-modes)
5. [Usage Guidelines](#usage-guidelines)
6. [Maintenance](#maintenance)
7. [Best Practices](#best-practices)

---

## What are Steering Files?

Steering files are Markdown documents that provide contextual guidance to Kiro IDE. They ensure consistent development practices, reduce repetitive explanations, and maintain alignment with project goals and technical standards.

### Key Benefits
- ✅ **Consistent Context**: Always-available project information
- ✅ **Reduced Repetition**: No need to re-explain project details
- ✅ **Context-Aware Assistance**: Targeted guidance based on current file type
- ✅ **Team Alignment**: Shared understanding of standards and practices
- ✅ **Quality Assurance**: Built-in best practices and conventions

---

## File Overview

### Always Included Files (Global Context)

#### `product.md`
- **Purpose**: Product vision, target users, key features, business goals
- **Contains**: Market analysis, competitive positioning, success metrics
- **When Loaded**: Every interaction with Kiro
- **Use Case**: Ensures all development aligns with business objectives

#### `tech.md`
- **Purpose**: Technology stack, versions, development tools, commands
- **Contains**: Framework versions, dependencies, development commands
- **When Loaded**: Every interaction with Kiro
- **Use Case**: Technical reference for versions and configurations

#### `structure.md`
- **Purpose**: Project structure, naming conventions, import patterns
- **Contains**: Directory layout, file organization, coding standards
- **When Loaded**: Every interaction with Kiro
- **Use Case**: Maintains consistent project organization

### Conditionally Included Files (File-Specific Context)

#### `component-conventions.md`
- **Purpose**: React component development standards
- **Contains**: Component patterns, styling guidelines, accessibility standards
- **When Loaded**: When working on `*.tsx` files
- **Use Case**: Ensures consistent React component development

#### `api-standards.md`
- **Purpose**: API route development standards
- **Contains**: Response formats, error handling, authentication patterns
- **When Loaded**: When working on `api/**/*.ts` files
- **Use Case**: Maintains consistent API development practices

---

## How Steering Works

### Automatic Loading
Kiro automatically loads steering files based on their inclusion configuration:

1. **Always Included** files are loaded for every interaction
2. **File Match** files are loaded when working on matching file types
3. **Manual** files are loaded only when explicitly referenced

### Front Matter Configuration
Each steering file uses YAML front matter to specify inclusion behavior:

```yaml
---
inclusion: always
---
```

```yaml
---
inclusion: fileMatch
fileMatchPattern: "**/*.tsx"
---
```

```yaml
---
inclusion: manual
---
```

### Context Integration
- Steering content is seamlessly integrated into Kiro's context
- No special commands needed - guidance is automatically available
- Context is relevant to current development task

---

## Inclusion Modes

### 1. Always Included (`inclusion: always`)
- **Files**: `product.md`, `tech.md`, `structure.md`
- **Behavior**: Loaded for every Kiro interaction
- **Use Case**: Core project information that's always relevant
- **Example**: Product vision, tech stack, project structure

### 2. File Match (`inclusion: fileMatch`)
- **Files**: `component-conventions.md`, `api-standards.md`
- **Behavior**: Loaded when working on files matching the pattern
- **Configuration**: Requires `fileMatchPattern` in front matter
- **Use Case**: Specific guidance for certain file types
- **Example**: React patterns when editing `.tsx` files

### 3. Manual (`inclusion: manual`)
- **Files**: Custom steering files as needed
- **Behavior**: Loaded only when explicitly referenced with `#` in chat
- **Use Case**: Specialized guidance for specific features or workflows
- **Example**: Deployment procedures, testing strategies

---

## Usage Guidelines

### For Developers

#### When Writing Code
- Steering files automatically provide relevant context
- No need to ask about project structure or conventions
- Technical standards are consistently applied
- Version information is always available

#### When Asking Questions
- Context about FashionOS is automatically included
- Technical specifications are readily available
- Best practices are built into responses
- No need to explain project background

#### When Onboarding
- New team members get immediate context
- Project standards are clearly documented
- Technical setup is well-defined
- Development workflows are standardized

### For Project Managers

#### Project Alignment
- All development follows documented product vision
- Technical decisions align with business goals
- Team understanding is consistent
- Quality standards are maintained

#### Documentation Maintenance
- Steering files serve as living documentation
- Updates are immediately available to all developers
- Standards evolve with the project
- Knowledge is preserved and shared

---

## Maintenance

### When to Update Steering Files

#### Product Changes
- **Update `product.md`** when business goals or target market changes
- **Revise success metrics** when KPIs are adjusted
- **Update competitive analysis** when market landscape shifts

#### Technology Updates
- **Update `tech.md`** when upgrading frameworks or dependencies
- **Revise version numbers** when updating packages
- **Update commands** when development workflow changes

#### Structure Changes
- **Update `structure.md`** when reorganizing project directories
- **Revise naming conventions** when standards evolve
- **Update import patterns** when adding new path aliases

#### Standards Evolution
- **Update convention files** when coding standards change
- **Revise best practices** based on team learnings
- **Add new patterns** as project complexity grows

### Update Process

1. **Identify Need**: Recognize when steering content is outdated
2. **Review Impact**: Assess which files need updates
3. **Make Changes**: Update relevant steering files
4. **Test Integration**: Verify Kiro loads updated content correctly
5. **Communicate**: Inform team of steering file changes

### Version Control
- Steering files are version controlled with the project
- Changes are tracked and reviewable
- Team can see evolution of standards and practices
- Rollback is possible if needed

---

## Best Practices

### Writing Effective Steering Files

#### Content Guidelines
- **Be Specific**: Provide concrete, actionable guidance
- **Stay Current**: Keep information up-to-date with project reality
- **Be Concise**: Focus on essential information
- **Use Examples**: Include relevant examples where helpful

#### Structure Guidelines
- **Clear Headings**: Use descriptive section headers
- **Logical Flow**: Organize information logically
- **Consistent Format**: Maintain consistent formatting across files
- **Front Matter**: Always include proper inclusion configuration

#### Maintenance Guidelines
- **Regular Review**: Schedule periodic reviews of steering content
- **Team Input**: Gather feedback from development team
- **Incremental Updates**: Make small, frequent updates rather than large overhauls
- **Documentation**: Document changes and rationale

### File Organization

#### Naming Conventions
- Use descriptive, kebab-case names: `component-conventions.md`
- Include purpose in filename: `api-standards.md`
- Group related files with prefixes if needed

#### Content Organization
- Start with overview and purpose
- Organize by logical sections
- Include examples where helpful
- End with troubleshooting or common issues

#### Size Management
- Keep files focused on single topics
- Split large files into smaller, focused ones
- Cross-reference related files when appropriate
- Maintain reasonable file sizes for quick loading

---

## File Reference

### Current Steering Files

| File | Inclusion | Purpose | Content |
|------|-----------|---------|---------|
| `product.md` | Always | Product vision and strategy | Market analysis, goals, metrics |
| `tech.md` | Always | Technical reference | Versions, dependencies, commands |
| `structure.md` | Always | Project organization | Directory structure, conventions |
| `component-conventions.md` | File Match (*.tsx) | React development | Component patterns, styling |
| `api-standards.md` | File Match (api/**/*.ts) | API development | Response formats, error handling |
| `README.md` | Manual | Steering documentation | This documentation |

### Adding New Steering Files

1. **Create File**: Add new `.md` file in `.kiro/steering/`
2. **Add Front Matter**: Include appropriate inclusion configuration
3. **Write Content**: Follow content and structure guidelines
4. **Test Loading**: Verify Kiro loads the file correctly
5. **Update README**: Add file to reference table above

---

## Troubleshooting

### Common Issues

#### Steering File Not Loading
- **Check Front Matter**: Ensure proper YAML syntax
- **Verify File Path**: Confirm file is in `.kiro/steering/` directory
- **Check Pattern**: For file match, verify pattern syntax
- **Restart Kiro**: Sometimes requires restart to pick up new files

#### Conflicting Information
- **Review All Files**: Check for contradictory guidance
- **Update Outdated Content**: Remove or update conflicting information
- **Prioritize Sources**: Establish hierarchy for conflicting guidance

#### Performance Issues
- **File Size**: Keep steering files reasonably sized
- **Content Relevance**: Remove outdated or irrelevant content
- **Inclusion Strategy**: Use file match instead of always when appropriate

### Getting Help

- **Team Discussion**: Discuss steering file issues with development team
- **Documentation Review**: Check Kiro documentation for steering file features
- **Iterative Improvement**: Continuously refine steering files based on usage

---

## Conclusion

The FashionOS steering files system provides a robust foundation for consistent, context-aware development assistance. By maintaining these files and following the guidelines in this README, the development team can ensure high-quality, aligned development practices throughout the project lifecycle.

For questions or suggestions about the steering system, please discuss with the development team or update this README with improvements.

**Last Updated**: July 17, 2025
**Next Review**: August 1, 2025